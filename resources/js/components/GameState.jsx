import React, { useState, useRef, useEffect } from 'react';

const GameState = ({setCurrentGameState, challenge, setFinishTime}) => {
    const [currentChallenge, setCurrentChallenge] = useState("et".split(""));
    const [currentLetter, setCurrentLetter] = useState(currentChallenge[0]);
    const [currentIndexOfChallengeLetter, setCurrentIndexOfChallengeLetter] = useState(currentChallenge.indexOf(currentLetter));

    const [currentMorseCodeTyped, setCurrentMorseCodeTyped] = useState("");
    const [previousMorseCodeTyped, setPreviousMorseCodeTyped] = useState("");
    const [mouseDown, setMouseDown] = useState(false);
    const [mouseDownTimeStamp, setMouseDownTimeStamp] = useState("");
    const [mouseUpTimeStamp, setMouseUpTimeStamp] = useState("");
    const [startTime, setStartTime] = useState("");
    const [challengeComplete, setChallengeComplete] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);

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
            setInputDisabled(true);
            currentLetterElement.classList.remove('cursor');
            currentLetterElement.classList.add('shake');
            setPreviousMorseCodeTyped(currentMorseCodeTyped);
            setCurrentMorseCodeTyped("");

            setTimeout(() => {
                currentLetterElement.classList.add('cursor');
                currentLetterElement.classList.remove('shake');
                setPreviousMorseCodeTyped("");
                setInputDisabled(false);
            }, 200);
        }

        if (currentMorseIsCorrect && morseMatchesTargetLetterLength) {
            if (currentChallenge[currentIndexOfChallengeLetter + 1] === ' ') {
                setTimeout(() => {
                    setCurrentIndexOfChallengeLetter(currentIndexOfChallengeLetter + 2);
                    setCurrentLetter(currentChallenge[currentIndexOfChallengeLetter + 2]);
                }, 200);
            } else if (currentChallenge.length === currentIndexOfChallengeLetter + 1) {
                setChallengeComplete(true);
            } else {
                setCurrentIndexOfChallengeLetter(currentIndexOfChallengeLetter + 1);
                setCurrentLetter(currentChallenge[currentIndexOfChallengeLetter + 1]);
            }
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
        if (!inputDisabled) {
            if (!mouseDown) {
                setMouseDown(true);
                setMouseDownTimeStamp(e.timeStamp);
            }
    
            if (!timerStarted.current) {
                setStartTime(e.timeStamp);
                timerStarted.current = true;
            }
        }
    }

    const stopTypingMorse = (e) => {
        if (!inputDisabled) {
            if (mouseDown) {
                setMouseDown(false);
                setMouseUpTimeStamp(e.timeStamp);
            }
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
    }, [challengeComplete]);

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