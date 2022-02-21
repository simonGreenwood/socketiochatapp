const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const http = require('http')
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server,{cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }})
io.on('connection',socket => {
    console.log("A user has connected")
    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', message);
      })
})
const PORT = process.env.PORT || 3001
server.listen(PORT,() => {
    console.log(`App listening on ${PORT}`)
})