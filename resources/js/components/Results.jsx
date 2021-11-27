import React from 'react';


const Results = ({setCurrentGameState, finishTime}) => {

    const finishTimeDateObject = new Date(finishTime);

    const finishTimeResult = `${finishTimeDateObject.getMinutes()} minutes ${finishTimeDateObject.getSeconds()} seconds ${finishTimeDateObject.getMilliseconds()} ms`;
    
    return (
        <div className="text-center list-group w-50 mx-auto mt-5">
            <ul className="results-list">
                <li>
                    <h1 data-menu-item="game-ready">Completion time: {finishTimeResult}</h1>
                </li>
                <li>
                    <h1 data-menu-item="playground">Wpm: </h1>
                </li>
                <li>
                    <h1 data-menu-item="records">Better than: </h1>
                </li>
                <li>
                    <h1 className="results-back-to-main-menu mt-4" data-menu-item="records" onClick={() => setCurrentGameState('main-menu')}>Main menu</h1>
                </li>
            </ul>
        </div>
    );
};

export default Results;