const express = require('express');
const path = require('path');
const PORT = 5000;

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let htmlPath = 'vanilla/index.html';

if (process.env.NODE_MODE === 'react.js') {
    htmlPath = 'react-js/build/index.html';
    app.use('/static', express.static(path.join(__dirname, 'react-js/build/static')));
} else {
    app.use('/public', express.static(path.join(__dirname, 'vanilla')));
}

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, htmlPath));
});

require('./data-emitter')(io);

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
