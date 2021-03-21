import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import logoc from '../assets/logoc.png'

const Header = () => {
    return (
        <>
            <Jumbotron>
                <h2>Welcome to the <span className="header-top">Skullcord</span>, enjoy !</h2>
                <p>You can choose your username and room below to enter chat room.</p>
                <Image src={logoc} alt="error" fluid />
            </Jumbotron>
        </>
    )
}

export default Header
