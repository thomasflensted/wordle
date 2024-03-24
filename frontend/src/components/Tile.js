import React from 'react'

const Tile = ({ char, grayOut, color, isKeyboard, handleKeyDown }) => {

    var keyBoardClasses = typeof char !== "string"
        ? "key tile tile-filled tile-big"
        : "key tile tile-filled tile-small"
    keyBoardClasses = grayOut ? `${keyBoardClasses} tile-colored gray` : keyBoardClasses;

    var classes = char
        ? `tile tile-small tile-filled`
        : "tile tile-small";
    classes = color ? `${classes} ${color} tile-colored` : classes;

    return (
        <div
            className={isKeyboard ? keyBoardClasses : classes}
            onClick={() => isKeyboard ? handleKeyDown(char) : null}
        >{char}
        </div>
    )
}

export default Tile