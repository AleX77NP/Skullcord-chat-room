const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const generateMessage = require('./utils/messages');
const {userJoined, userLeaves, getRoomUsers, getCurrentUser} = require('./utils/users');


const app = express()
const server = http.createServer(app);
const io = socketio(server, {cors: {origin: '*'}})

const botName = 'Skullbot';

io.on('connection', socket => {
    
    socket.on('joinRoom', ({user, room}) => {
        let userJ = userJoined(socket.id, user, room)
        let roomUsers = getRoomUsers(userJ.room)
        socket.join(room)
        socket.emit('message', generateMessage(botName, 'Welcome to Skullcord !'))
        socket.broadcast.to(userJ.room).emit('message', generateMessage(botName, `A ${userJ.username} has joined the chat.`));
        io.to(userJ.room).emit('roomUsers', roomUsers)
    })

    socket.on('chatMessage',(msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', generateMessage(msg.user, msg.text))
    })

    socket.on('disconnect', () => {
        const user = userLeaves(socket.id)
        console.log(user)
        if (user) {
            let roomUsers = getRoomUsers(user.room)
            io.to(user.room).emit('message', generateMessage(botName, `${user.username} has left the chat.`))
            io.to(user.room).emit('roomUsers', roomUsers)
        }
    })
})


const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))