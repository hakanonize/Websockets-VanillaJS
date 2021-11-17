const express = require('express');
const { createServer } = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
app.use(express.json());
let count = 0;

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get('/', (req, res) => {
  const randomText = makeid(12);
  io.emit('message', randomText);
});

app.post('/increment', (req, res) => {
  var currentCount = req.body.count;
  console.log(currentCount++);
  res.status(200).json({ count: currentCount++ });
});

app.post('/decrement', (req, res) => {
  var currentCount = req.body.count;
  console.log(currentCount--);
  res.status(200).json({ count: currentCount-- });
});

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} is connected`);
});

httpServer.listen(3000, () => {
  console.log('server started');
});

module.exports = io;
