import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import GameState from './GameState';
import MainMenu from './MainMenu';

function MorseCodes() {
    const [currentGameState, setCurrentGameState] = useState("main-menu");

    if (currentGameState === 'main-menu') {
        return <MainMenu setCurrentGameState={setCurrentGameState} />
    }

    if (currentGameState === 'playground') {
        return "playground";
    }

    if (currentGameState === 'records') {
        return "records";
    }

    if (currentGameState === 'result') {
        return "result";
    }

    if (currentGameState === 'game-ready') {
        return <GameState />
    }
}

export default MorseCodes;

if (document.getElementById('content')) {
    ReactDOM.render(<MorseCodes />, document.getElementById('content'));
}
