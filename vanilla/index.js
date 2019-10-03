(function () {
    const table = getById('table');

    function getById (id) {
        return document.getElementById(id);
    }

    function createSquare (square) {
        const el = document.createElement('div');
        el.className = 'square ' + square.color + (square.isHighlighted ? ' highlighted' : '');
        el.id = 'square-' + square.id;
        return el;
    }

    function appendSquare (square) {
        const el = createSquare(square);
        table.appendChild(el);
    }

    function replaceSquare (square) {
        const el = getById('square-' + square.id);
        el.className = 'square ' + square.color + (square.isHighlighted ? ' highlighted' : '');
    }

    try {
        const socket = io();
        
        socket.on('current state', squares => {
            table.innerHTML = '';

            squares.forEach(square => {
                appendSquare(square);
            });
        });

        socket.on('square change', square => {
            replaceSquare(square);
        });

        console.info('websocket connected');
    } catch (error) {
        console.error(error);
    }
}());
