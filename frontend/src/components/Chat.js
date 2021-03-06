import React, {useState,useEffect} from "react"
import Send from '../send.svg';
const Chat = ({messages, updateMessages, updateOnline, online, socket, username}) => {
  const [newMessage,setNewMessage] = useState('')
  const msgUpdater = () => {
    socket.on('message',(from,msg) => {
      updateMessages({from,msg})
    })
    socket.on('online update',(o) => {
      console.log('Online:',o)
      updateOnline(o)
    })
    return()=>{
      socket.off('message')
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    socket.emit('message',username,newMessage)
    setNewMessage('')
  }

  const mainDiv = {
    display:'flex',
    flexFlow:'row wrap'
  }
  const onlineDiv = {
    top:'0px',
    flexBasis:'auto',
    position:'sticky',
    paddingLeft:'10px'
  }

  const messageDiv = {

    wordWrap: 'break-word',
    flexBasis: '75%',
    marginBottom:'auto'
   } 
  const bottomBar = {
    position:'fixed',
    bottom:'0px',
    width:'100%',
    paddingBottom:'10px',
    height:'5%',
    background:'#383838',
    display:'flex',
    flexFlow:'row nowrap',
    paddingTop:'15px',
    paddingBottom:'15px'
  } 
  useEffect(msgUpdater,[socket,messages,updateMessages])
  return (
    <div style={mainDiv}>
      <div style={messageDiv}>
        <h1>Chat App</h1>
        {messages.map(msg=><p style={{overflow:'hidden'}}>{`${msg.from}: ${msg.msg}`}</p>)}
      </div>
      <div style={onlineDiv}>
        <h1>Online</h1>
        {online.map(user => <p>{user.name}</p>)}
      </div>
      <form onSubmit={event => handleSubmit(event)} style={bottomBar}>
          <input value={newMessage} onChange={event=>setNewMessage(event.target.value)} style={{borderRadius:'10px',border:'0px',flexGrow:8,marginLeft:'0.5%',marginRight:'1%',paddingLeft:'10px',paddingRight:'10px'}}/>
          <button style={{backgroundImage:`url(${Send})`,backgroundRepeat:'no-repeat',height:'38px',width:'38px', border:'0px',borderRadius:'10px',backgroundPosition:'center',marginRight:'2%',flexGrow:0.4}}></button>
      </form>
    </div>
  )
}
export default Chat