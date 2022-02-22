import React, {useState,useEffect} from "react"
import io from 'socket.io-client'

const Chat = ({messages,updateMessages,socket}) => {
  const [newMessage,setNewMessage] = useState('')
  const msgUpdater = () => {
    socket.on('message',msg => {
      updateMessages(msg)
    })
    return()=>{
      socket.off('message')
    }
  }
  useEffect(msgUpdater,[socket,messages])
  return (
    <div>
      {messages.map(msg=><p>{msg}</p>)}
      <form onSubmit={event => {
        event.preventDefault()
        socket.emit('message',newMessage)
        setNewMessage('')
      }}>
        <input value={newMessage} onChange={event => setNewMessage(event.target.value)}/>
        <button formAction="submit">SEND MSG</button>
      </form>
    </div>
  )
}
const App = () => {
  const [socket,setSocket] = useState(null)
  const [messages,setMessages] = useState([])
  const updateMessages = (item) => {
    setMessages(messages.concat(item))
  }
  const hook = () => {
    const sock = io('localhost:3001')
    setSocket(sock)
    sock.emit('message','A user has connected')
  }
  useEffect(hook,[])
  return (
    <div>
      <h1>Chat App</h1>
      {socket ? <Chat messages={messages} updateMessages={updateMessages} socket={socket} />:<p>Loading...</p>}
    </div>
  );
}

export default App;
