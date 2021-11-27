import React from 'react';

const MainMenu = ({ setCurrentGameState }) => {
    
    return (
        <div className="text-center list-group w-50 mx-auto mt-5">
            <ul className="morse-code-main-menu-list">
                <li>
                    <h1 className="morse-code-main-menu-item" onClick={() => setCurrentGameState('game-ready')}>Play</h1>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;