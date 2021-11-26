import React from 'react';

const MainMenu = ({ setCurrentGameState }) => {

    const handleMenuSelection = ({target: {dataset: {menuItem}}}) => {
        setCurrentGameState(menuItem);
    }

    return (
        <div className="text-center list-group w-50 mx-auto mt-5">
            <ul className="morse-code-main-menu-list">
                <li>
                    <h1 className="morse-code-main-menu-item" data-menu-item="game-ready" onClick={handleMenuSelection}>Play</h1>
                </li>
                <li>
                    <h1 className="morse-code-main-menu-item" data-menu-item="playground" onClick={handleMenuSelection}>Playground</h1>
                </li>
                <li>
                    <h1 className="morse-code-main-menu-item" data-menu-item="records" onClick={handleMenuSelection}>Records</h1>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;