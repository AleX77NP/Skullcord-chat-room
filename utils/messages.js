const moment = require('moment')

function generateMessage(user, text) {
    return {
        user,
        text,
        date: moment().format('h:mm a')
    }
}

module.exports = generateMessage;