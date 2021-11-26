import React, { useState, useRef, useEffect } from 'react';

const GameState = () => {
    const [challengeSelected, setChallengeSelected] = useState(false);
    const [currentChallenge, setCurrentChallenge] = useState("et".split(""));
    const [currentLetter, setCurrentLetter] = useState(currentChallenge[0]);
    const [currentMorseCodeTyped, setCurrentMorseCodeTyped] = useState("");
    const [previousMorseCodeTyped, setPreviousMorseCodeTyped] = useState("");
    const [mouseDown, setMouseDown] = useState(false);
    const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState("");
    const [mouseUpTimeStamp, setMouseUpTimeStamp] = useState("");
    const [startTime, setStartTime] = useState("");
    const [finishTime, setFinishTime] = useState("");
    const currentIndexOfChallengeLetter = currentChallenge.indexOf(currentLetter);
    const challengeComplete = currentIndexOfChallengeLetter === -1;

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
            setPreviousMorseCodeTyped(currentMorseCodeTyped);
            setCurrentMorseCodeTyped("");

            setTimeout(() => {
                currentLetterElement.classList.add('cursor');
                currentLetterElement.classList.remove('shake');
                setPreviousMorseCodeTyped("");
            }, 200);
        }

        if (currentMorseIsCorrect && morseMatchesTargetLetterLength) {
            setCurrentLetter(currentChallenge[currentIndexOfChallengeLetter + 1]);
            setPreviousMorseCodeTyped(currentMorseCodeTyped);
            setCurrentMorseCodeTyped("");
            
            setTimeout(() => {
                setPreviousMorseCodeTyped("");
            }, 200);
        }
    }

    const detectDotOrDash = () => {
        const timeStampDifference = mouseUpTimeStamp - mouseDownTimeStamp;
        const previousMorseCodeTyped = currentMorseCodeTyped;

        if (timeStampDifference > 250) {
            setCurrentMorseCodeTyped([...previousMorseCodeTyped, "-"]);
        } else {
            setCurrentMorseCodeTyped([...previousMorseCodeTyped, "."]);
        }
    }
    
    
    const firstUpdate = useRef(true);
    const timerStarted = useRef(false);

    const startTypingMorse = (e) => {
        if (!mouseDown) {
            setMouseDown(true);
            setMouseDownTimeStamp(e.timeStamp);
        }

        if (!timerStarted.current) {
            setStartTime(e.timeStamp);
            timerStarted.current = true;
        }
    }

    const stopTypingMorse = (e) => {
        if (mouseDown) {
            setMouseDown(false);
            setMouseUpTimeStamp(e.timeStamp);
        }
    }
    
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

    useEffect(() => {
        if (challengeComplete) {
            setFinishTime(mouseUpTimeStamp - startTime);
            setCurrentGameState('results');
        }
    }, [currentIndexOfChallengeLetter]);

    return (
        <div className="container w-100 text-center" style={{ userSelect: "none" }}>

            <h1 style={{ fontSize: "5em" }}>
                { currentChallenge.map((letter, i) => {
                    const currentLetter = (i === currentIndexOfChallengeLetter);
                    const futureLetters = (i > currentIndexOfChallengeLetter);

                    if (currentLetter) {
                        return (
                            <span key={i} id={`challenge-letter-${i}`} className="cursor">{letter}</span>
                        )
                    }

                    if (futureLetters) {
                        return (
                            <span key={i} id={`challenge-letter-${i}`} className="future-letter">{letter}</span>
                        )
                    }

                    return <span key={i} id={`challenge-letter-${i}`}>{letter}</span>
                })
                }
            </h1>

            <h1 style={{ fontSize: "10em" }}>
                {currentMorseCodeTyped === '' ? previousMorseCodeTyped : currentMorseCodeTyped}
            </h1>

            <div className="eightbit-btn" onMouseDown={startTypingMorse} onMouseUp={stopTypingMorse}></div>

        </div>
    );
};

export default GameState;