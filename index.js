const express = require('express');
const path = require('path');
const PORT = 5000;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const chatLog = [];

app.use('/public', express.static(path.join(__dirname, 'vanilla')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vanilla/index.html'));
});

io.on('connection', socket => {
    console.log('a user connected');

    if (chatLog.length) {
        chatLog.forEach(msg => {
            socket.emit('message', msg);
        });
    }

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', msg => {
        console.log(`message: ${msg}`);
        chatLog.push(msg);
        socket.broadcast.emit('message', msg);
    });
});

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
