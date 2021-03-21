let users = []

function userJoined(id, username, room) {
    const user = {
        id,
        username,
        room
    }
    users.push(user)
    return user
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}

function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

function userLeaves(id) {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1) {
        return users.splice(index,1)[0];
    }
}

module.exports = {
    userJoined,
    getCurrentUser,
    getRoomUsers,
    userLeaves
};