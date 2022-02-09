
import './App.css';
import {useState, useEffect} from "react";
import { io } from "socket.io-client";
const socket = io();
/*
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';g
          }
        });

        socket.on('chat message', function(msg) {
          var item = document.createElement('li');
          item.textContent = msg;
          messages.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
        });
      </script>*/
function App() {
  const [newMsg,setNewMsg] = useState('')
  socket.on('chat message', (m) => {
    console.log(m)
    
  });
  return (
    <div className="App">
      <ul id="messages"></ul>
      <form id="form" action='submit' onSubmit={(event) => {
        socket.emit('chat message', newMsg)
        event.preventDefault()
        console.log("sent",newMsg)

        }}>
        <input id="input" autocomplete="off" value={newMsg} onChange={(event) => {
          setNewMsg(event.target.value)
          console.log(event.target.value)
        }}/>
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
