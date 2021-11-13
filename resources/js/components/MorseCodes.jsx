import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function MorseCodes() {

    const [currentMorseCodes, setCurrentMorseCodes] = useState(morseCodes.oneChar);
    const [currentMorseCodeTyped, setCurrentMorseCodeTyped] = useState("");
    const [mouseDown, setMouseDown] = useState(false);
    const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState(0);
    const [mouseUpTimeStamp, setMouseUpTimeStamp] = useState(0);

    const getRandomLetter = () => {
        const randomNumber = Math.floor(Math.random() * currentMorseCodes.length);

        return currentMorseCodes[randomNumber].letter;
    }

    const [currentMorseLetter] = useState(getRandomLetter());

    const detectDotOrDash = () => {
        console.log(mouseUpTimeStamp - mouseDownTimeStamp);
    }
    
    const startTypingMorse = (e) => {
        if (!mouseDown) {
            setMouseDown(true);
            setMouseDownTimeStamp(e.timeStamp);
        }
    }

    const stopTypingMorse = (e) => {
        if (mouseDown) {
            setMouseDown(false);
            setMouseUpTimeStamp(e.timeStamp);
        }
    }

    useEffect(() => {
        detectDotOrDash();
    }, [mouseUpTimeStamp]);

    return (
        <div className="container w-100 text-center" style={{ userSelect: "none" }}>

            <h1 style={{ fontSize: "10em" }}>
                    {currentMorseLetter}
            </h1>
            
            <h1 style={{ fontSize: "10em" }}>
                {currentMorseCodeTyped}
            </h1>

            <div className="button gray" onMouseDown={startTypingMorse} onMouseUp={stopTypingMorse}></div>

        </div>
    );
}

export default MorseCodes;

if (document.getElementById('content')) {
    ReactDOM.render(<MorseCodes />, document.getElementById('content'));
}
