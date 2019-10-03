const express = require('express');
const path = require('path');
const PORT = 5000;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/public', express.static(path.join(__dirname, 'vanilla')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vanilla/index.html'));
});

require('./data-emitter')(io);

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
