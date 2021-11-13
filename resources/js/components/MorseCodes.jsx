import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function MorseCodes() {
    const [currentMorseCodes, setCurrentMorseCodes] = useState(morseCodes.oneChar);
    const [currentMorseCodeTyped, setCurrentMorseCodeTyped] = useState("");
    const [mouseDown, setMouseDown] = useState(false);
    const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState([]);
    const [mouseUpTimeStamp, setMouseUpTimeStamp] = useState([]);

    const getRandomLetter = () => {
        const randomNumber = Math.floor(Math.random() * currentMorseCodes.length);

        return currentMorseCodes[randomNumber].letter;
    }

    const [currentMorseLetter] = useState(getRandomLetter());

    const detectDotOrDash = () => {
        const timeStampDifference = mouseUpTimeStamp - mouseDownTimeStamp;
        const previousMorseCodeTyped = currentMorseCodeTyped;

        if (timeStampDifference > 250) {
            setCurrentMorseCodeTyped([...previousMorseCodeTyped, "-"]);
        } else {
            setCurrentMorseCodeTyped([...previousMorseCodeTyped, "·"]);
        }
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

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (!firstUpdate.current) {
            detectDotOrDash();
        }
        firstUpdate.current = false;
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
