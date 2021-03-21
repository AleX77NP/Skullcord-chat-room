import { useState } from 'react';
import './App.css';
import ChatRoom from './pages/ChatRoom';
import Landing from './pages/Landing';

function App() {

  const [enterRoom, setEnterRoom] = useState(false)
  const [room, setRoom] = useState('')
  const [user, setUser] = useState('')

  const enterChatRoom = (room, username) => {
    setEnterRoom(true)
    setRoom(room)
    setUser(username)
  }

  const leaveRoom = () => {
    setEnterRoom(false)
  }

  return (
    <div className="my-container">
    {enterRoom ? <ChatRoom room={room} username={user} onLeave={leaveRoom} /> : <Landing onEnter={enterChatRoom} />}
    <div style={{height: '350px'}}></div>
    </div>
  );
}

export default App;
