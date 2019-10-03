import React, { useReducer, useEffect } from 'react';
import Square from './Square';
import io from 'socket.io-client';

const initialState = [];

function reducer (state, action) {
    switch (action.type) {
        case 'initialize':
            return action.payload;
        case 'change':
            const squares = [...state];
            const squareId = action.square.id;
            const idx = squares.findIndex(square => square.id === squareId);
            
            if (idx !== -1) {
                squares[idx] = action.square;
            }

            return squares;
        default:
            throw new Error();
    }
}

function App () {
    const [squares, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const socket = io();
        
        socket.on('current state', squares => {
            dispatch({
                type: 'initialize',
                payload: squares,
            });
        });

        socket.on('square change', square => {
            dispatch({
                type: 'change',
                square,
            });
        });

        console.info('websocket connected');
    }, []);

    return (
        <main>
            <h1>React.js</h1>

            <section id="table">
                {squares.map(square => <Square key={square.id} square={square} />)}
            </section>
        </main>
    );
}

export default App;
