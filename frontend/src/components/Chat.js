import React, {useState,useEffect} from "react"



const Chat = ({messages,updateMessages,socket,username}) => {
  const [newMessage,setNewMessage] = useState('')
  const msgUpdater = () => {
    socket.on('message',(from,msg) => {
      updateMessages({from,msg})
    })
    return()=>{
      socket.off('message')
    }
  }
  useEffect(msgUpdater,[socket,messages,updateMessages])
  return (
    <div>
      {messages.map(msg=><p>{`${msg.from}: ${msg.msg}`}</p>)}
      <form onSubmit={event => {
        event.preventDefault()
        socket.emit('message',username,newMessage)
        setNewMessage('')
      }}>
        <input value={newMessage} onChange={event => setNewMessage(event.target.value)}/>
        <button formAction="submit">SEND MSG</button>
      </form>
    </div>
  )
}
export default Chat