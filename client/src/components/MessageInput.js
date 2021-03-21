import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MessageInput = ({ onSend }) => {

    const [msg, setMsg] = useState('')
    const inputRef = useRef(null)

    const sendMessage = () => {
        if (msg === '') {
            alert('Message cannot be empty.')
        } else {
        onSend(msg)
        if(inputRef.current) {
            inputRef.current.value = ''
        }
      }
    }

    return (
        <div style={{width: '100%', marginTop: '30px'}}>
            <Form style={{display: 'flex', flexDirection: 'row'}}>
                <Form.Control type="text" placeholder="Enter your message here..." onChange={(e) => setMsg(e.target.value)} ref={inputRef} />
                <Button onClick={() => sendMessage()} variant="danger">Send</Button>
            </Form>
        </div>
    )
}

export default MessageInput
