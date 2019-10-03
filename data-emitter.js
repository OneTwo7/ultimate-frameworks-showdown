const NUMBER_OF_SQUARES = 1000;
const EVENT_GENERATOR_INTERVAL = 50;
const NUMBER_OF_EVENTS_GENERATED = 5;

const squares = [];
const colors = [
    'green',
    'blue',
    'cyan',
    'yellow',
    'purple',
    'black',
    'orange',
    'red',
];
let i;

for (i = 0; i < NUMBER_OF_SQUARES; i++) {
    squares.push({
        id: i + 1,
        color: colors[Math.floor(Math.random() * 8)],
        isHighlighted: Math.random() > .5,
    });
}

module.exports = (io) => {
    io.on('connection', socket => {
        console.log('a user connected');
    
        if (squares.length) {
            socket.emit('current state', squares);
        }
    
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        setInterval(function () {
            for (i = 0; i < NUMBER_OF_EVENTS_GENERATED; i++) {
                const idx = Math.floor(Math.random() * NUMBER_OF_SQUARES);
                const square = squares[idx];
                square.color = colors[Math.floor(Math.random() * 8)];
                square.isHighlighted = Math.random() > .5;
                io.emit('square change', square);
            }
        }, EVENT_GENERATOR_INTERVAL);
    
        socket.on('message', msg => {
            console.log(`message: ${msg}`);
            chatLog.push(msg);
            socket.broadcast.emit('message', msg);
        });
    });
};
