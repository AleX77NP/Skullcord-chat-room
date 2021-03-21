import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Header from '../components/Header'
import '../styles/Landing.css'

const Landing = ({ onEnter }) => {

    const [chosenRoom, setChoosenRoom] = useState('Cowboys')
    const [me, setMe] = useState('')

    const goRoom = (e) => {
        e.preventDefault();
        onEnter(chosenRoom, me)
    }

    return (
        <div className="landing-wrapper">
            <Header />
            <Form onSubmit={goRoom}>
                <Form.Group controlId="basicEnterForm">
                    <Form.Label style={{color: 'white'}} >Enter your username:</Form.Label>
                    <Form.Control type="text" placeholder="username..." onChange={(e) => setMe(e.target.value)} />
                </Form.Group>
                <Form.Group>
                <Form.Label style={{color: 'white'}} >Choose your room</Form.Label>
                    <Form.Control as="select" onChange={(e) => setChoosenRoom(e.target.value)}>
                        <option value="Cowboys">Cowboys</option>
                        <option value="Pirates">Pirates</option>
                        <option value="Knights">Knights</option>
                        <option value="Cooks">Cooks</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="danger" type="success">Enter chosen room</Button>
            </Form>
        </div>
    )
}

export default Landing
