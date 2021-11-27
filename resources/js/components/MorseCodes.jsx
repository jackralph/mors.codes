import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import GameState from './GameState';
import MainMenu from './MainMenu';
import Results from './Results';

function MorseCodes() {
    const [currentGameState, setCurrentGameState] = useState("main-menu");
    const [finishTime, setFinishTime] = useState("");

    if (currentGameState === 'main-menu') {
        return <MainMenu setCurrentGameState={setCurrentGameState} />
    }

    if (currentGameState === 'game-ready') {
        return <GameState 
            setCurrentGameState={setCurrentGameState} 
            setFinishTime={setFinishTime}
        />
    }

    if (currentGameState === 'results') {
        return <Results setCurrentGameState={setCurrentGameState} finishTime={finishTime}/>;
    }

}

export default MorseCodes;

if (document.getElementById('content')) {
    ReactDOM.render(<MorseCodes />, document.getElementById('content'));
}
