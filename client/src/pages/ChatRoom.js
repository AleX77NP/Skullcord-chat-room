import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import '../styles/Room.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CheatHeader from '../components/CheatHeader'
import usersLogo from '../assets/users.png'
import MessageInput from '../components/MessageInput'
import socketClient from 'socket.io-client';
import { SERVER_ENDPOINT } from '../constants/api'

const ChatRoom = ({ room, username, onLeave }) => {

    const [users, setUsers] = useState([])
    const [msgs, setMsgs] = useState([])
    const messagesRef = useRef(null)

    var socket = useMemo(() => 
         socketClient(SERVER_ENDPOINT),
    [])

    const onJoin = useCallback(() => {
        socket.emit('joinRoom', {user: username, room: room})
    },[room, socket, username])

    useEffect(() => {
        onJoin()
    },[onJoin])

    useEffect(() => {
        socket.on('message', (message) => {
            setMsgs([...msgs, message])
        })
    
        socket.on('roomUsers', users => {
            setUsers(users)
        })
        if(messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    },[msgs,socket])

    useEffect(() => {
        console.log('disconnect...')

        return () => socket.disconnect()
    },[socket])

    // Send message - chat
    const sendMessage = (msg) => {
        socket.emit('chatMessage',{user: username, date: null, text: msg})
    }


    return (
        <>
        <div className="room-wrapper">
            <CheatHeader onLeaveRoom={onLeave} />
            <Row>
                <Col sm={12} md={3} style={{height: '500px'}}>
                    <h3 style={{color: 'white'}}>Room name:</h3>
                    <h3 style={{color: 'lightgray'}}>{room}</h3>
                    <hr style={{backgroundColor: 'white'}} />
                    <div className="users-title">
                    <img className="users-logo" src={usersLogo} alt="error" />
                    <h4 style={{marginLeft: '10px', color: 'white'}}>Users</h4>
                    </div>
                    
                    <div className="users-list">
                        {users.map((user, index) => (
                            <h5 style={{color:'white'}} key={index}>{user.username}</h5>
                        ))}
                    </div>
                </Col>


                <Col sm={12} md={9}>
                    <div className="chat-container">
                    <div className="messages" ref={messagesRef}>
                        {msgs.map((msg, index) => (
                           <div className="message-item" key={index}>
                               <h6 style={{paddingLeft: '5px', paddingTop: '5px', color: 'lightgray'}}>{msg.user} {msg.date}</h6>
                               <p style={{paddingLeft: '5px', color: 'white'}}>{msg.text}</p>
                           </div>
                        ))}
                    </div>
                    </div>
                </Col>
            </Row>
            <MessageInput onSend={sendMessage} />
        </div>
        <div style={{height: '120px'}}></div>
        </>
    )
}

export default ChatRoom
