import React from 'react'
import Button from 'react-bootstrap/Button'

const CheatHeader = ({ onLeaveRoom }) => {
    return (
        <>
        <div className="chat-header">
            <h2 className="header-top">Skullcord</h2>
            <Button onClick={onLeaveRoom} variant="danger">Leave room</Button>
        </div>
        <hr style={{backgroundColor: 'white'}} />
        </>
    )
}

export default CheatHeader
