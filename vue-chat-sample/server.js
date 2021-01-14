const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://test-front.s3.ap-northeast-2.amazonaws.com',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors());
app.use('/static', express.static(__dirname + '/src/static/'));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg.message);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});