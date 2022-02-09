const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);

app.use(cors({
  origin:'http://localhost:3000'
}))

/*app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });*/

server.listen(3001, () => {
  console.log('listening on *:3001');
});