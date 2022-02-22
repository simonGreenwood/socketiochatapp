import React, {useState,useEffect} from "react"
import io from 'socket.io-client'
import Chat from "./Chat"
const Main = ({username}) => {
  const [socket,setSocket] = useState(null)
  const [messages,setMessages] = useState([])
  const updateMessages = (item) => {
    setMessages(messages.concat(item))
  }
  const hook = () => {
    const sock = io('localhost:3001')
    setSocket(sock)
    sock.emit('user connect',username)
  }
  useEffect(hook,[])
  return (
    <div>
    <h1>Chat App</h1>
    {socket ? <Chat messages={messages} updateMessages={updateMessages} socket={socket} username={username}/>:<p>Loading...</p>}
    </div>
  );
}
export default Main