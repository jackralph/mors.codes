import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function MorseCodes() {

    const [currentMorseCodes, setCurrentMorseCodes] = useState(morseCodes.oneChar);
    const [currentMorseCodeTyped, setCurrentMorseCodeTyped] = useState("");

    const getRandomLetter = () => {
        const randomNumber = Math.floor(Math.random() * currentMorseCodes.length);

        return currentMorseCodes[randomNumber].letter;
    }

    return (
        <div className="container w-100 text-center" style={{ userSelect: "none" }}>
            <h1 style={{ fontSize: "5em" }}>
                    {getRandomLetter()}
            </h1>
            
            <h1 style={{ fontSize: "5em" }}>
                {currentMorseCodeTyped}
            </h1>

            <div className="button gray"></div>
        </div>
    );
}

export default MorseCodes;

if (document.getElementById('content')) {
    ReactDOM.render(<MorseCodes />, document.getElementById('content'));
}
