const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connect', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
});

mongoose.connect('mongodb+srv://lsd123:lsd123@cluster0-tpqrn.mongodb.net/omni2?retryWrites=true', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));

server.listen(3333);
