const io = require("socket.io-client")
const socket = io('http://localhost:3001') 
socket.on('message',message=>console.log(message))
socket.emit('message','Message from testclient.js')