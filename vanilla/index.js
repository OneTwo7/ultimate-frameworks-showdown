(function () {
    const form = getById('form');
    const input = getById('input');
    const chat = getById('chat');

    function getById (id) {
        return document.getElementById(id);
    }

    function addMsg (msg, cls) {
        const el = document.createElement('p');

        if (cls) {
            el.className = cls;
        }

        el.textContent = msg;
        chat.appendChild(el);
    }

    try {
        const socket = io();
        input.focus();

        socket.on('message', msg => {
            addMsg(msg);
        });

        console.info('websocket connected');
    
        input.addEventListener('keydown', event => {
            if (event.key === 'ENTER') {
                form.submit();
            }
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const msg = input.value;

            if (msg) {
                addMsg(msg, 'sent-message');
                socket.emit('message', msg);
                console.info('message sent');
                input.value = '';
            }
        });
    } catch (error) {
        console.error(error);
    }
}());
