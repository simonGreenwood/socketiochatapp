import React, {useState,useEffect} from "react"
import io from 'socket.io-client'
import Chat from "./Chat"
const Main = ({username}) => {
  const [socket,setSocket] = useState(null)
  const [messages,setMessages] = useState([])
  const [online,setOnline] = useState([])
  const updateMessages = (item) => {
    setMessages(messages.concat(item))
  }
  const updateOnline = (onlineList) => {
    setOnline(onlineList)
  }
  const hook = () => {
    const sock = io('localhost:3000')
    sock.emit('user connect',username)
    setSocket(sock)
  }
  useEffect(hook,[])
  return (
    <div>
    {socket ? <Chat messages={messages} updateMessages={updateMessages} updateOnline={updateOnline}  online={online} socket={socket} username={username}/>:<p>Loading...</p>}
    </div>
  );
}
export default Main