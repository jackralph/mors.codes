import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function MorseCodes() {
    const [currentChallenge, setCurrentChallenge] = useState("ate".split(""));
    const [currentLetter, setCurrentLetter] = useState(currentChallenge[0]);
    const [currentMorseCodeTyped, setCurrentMorseCodeTyped] = useState("");
    const [mouseDown, setMouseDown] = useState(false);
    const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState([]);
    const [mouseUpTimeStamp, setMouseUpTimeStamp] = useState([]);
    const currentIndexOfChallengeLetter = currentChallenge.indexOf(currentLetter);

    const compareMorseToCurrentLetter = () => {
        const currentLetterElement = document.getElementById(`challenge-letter-${currentIndexOfChallengeLetter}`);
        const targetMorse = morseCodes[currentLetter];
        const morseMatchesTargetLetterLength = targetMorse.length === currentMorseCodeTyped.length;
        let correctMorseCount = 0;

        currentMorseCodeTyped.map((morse, i) => {
            if (morse === targetMorse.split("")[i]) {
                correctMorseCount++;
            }
        });

        const currentMorseIsCorrect = correctMorseCount === currentMorseCodeTyped.length;

        if (!currentMorseIsCorrect) {
            currentLetterElement.classList.remove('cursor');
            currentLetterElement.classList.add('shake');
            setCurrentMorseCodeTyped("");

            setTimeout(() => {
                currentLetterElement.classList.remove('shake');
                currentLetterElement.classList.add('cursor');
            }, 200);
        }

        if (currentMorseIsCorrect && morseMatchesTargetLetterLength) {
            setCurrentLetter(currentChallenge[currentIndexOfChallengeLetter + 1]);
        }
    }

    // Dots or Dashes

    const detectDotOrDash = () => {
        const timeStampDifference = mouseUpTimeStamp - mouseDownTimeStamp;
        const previousMorseCodeTyped = currentMorseCodeTyped;

        if (timeStampDifference > 250) {
            setCurrentMorseCodeTyped([...previousMorseCodeTyped, "-"]);
        } else {
            setCurrentMorseCodeTyped([...previousMorseCodeTyped, "."]);
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

    useEffect(() => {
        if (currentMorseCodeTyped.length) {
            compareMorseToCurrentLetter();
        }
    }, [currentMorseCodeTyped]);

    return (
        <div className="container w-100 text-center" style={{ userSelect: "none" }}>

            <h1 style={{ fontSize: "10em" }}>
                { currentChallenge.map((letter, i) => {
                    const currentLetter = (i === currentIndexOfChallengeLetter);
                    const futureLetters = (i > currentIndexOfChallengeLetter);

                    if (currentLetter) {
                        return (
                            <>
                                <span key={i} id={`challenge-letter-${i}`} className="cursor">{letter}</span>
                            </>
                        )
                    }

                    if (futureLetters) {
                        return (
                            <>
                                <span key={i} id={`challenge-letter-${i}`} className="future-letter">{letter}</span>
                            </>
                        )
                    }

                    return <span key={i} id={`challenge-letter-${i}`}>{letter}</span>
                })
                }
            </h1>

            <h1 style={{ fontSize: "10em" }}>
                {currentMorseCodeTyped}
            </h1>

            <div className="button grey" onMouseDown={startTypingMorse} onMouseUp={stopTypingMorse}></div>

        </div>
    );
}

export default MorseCodes;

if (document.getElementById('content')) {
    ReactDOM.render(<MorseCodes />, document.getElementById('content'));
}
