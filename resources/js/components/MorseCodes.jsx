import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function MorseCodes() {

    const [currentMorseCodes, setCurrentMorseCodes] = useState(morseCodes.oneChar);

    const getRandomLetter = () => {
        const randomNumber = Math.floor(Math.random() * currentMorseCodes.length);

        return currentMorseCodes[randomNumber].letter;
    }

    return (
        <div className="container">
            <p>{getRandomLetter()}</p>
        </div>
    );
}

export default MorseCodes;

if (document.getElementById('content')) {
    ReactDOM.render(<MorseCodes />, document.getElementById('content'));
}
