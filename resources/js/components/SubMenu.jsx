import React from 'react';

const SubMenu = ({ setCurrentDifficulty, setCurrentGameState }) => {

    const handleMenuSelection = ({target: {dataset: {menuItem}}}) => {
        setCurrentDifficulty(menuItem);
        setCurrentGameState("game-ready");
    }

    return (
        <div className="text-center list-group w-50 mx-auto mt-5">
            <ul className="morse-code-main-menu-list">
                <li>
                    <h1 className="morse-code-main-menu-item" data-menu-item="easy" onClick={handleMenuSelection}>Easy</h1>
                </li>
            </ul>
        </div>
    );
};

export default SubMenu;