import React from 'react';

export default function ({ square }) {
    return (
        <div
            id={`square-${square.id}`}
            className={`square ${square.color}${square.isHighlighted ? ' highlighted' : ''}`}
        />
    );
}
