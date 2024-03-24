import React from 'react'
import Row from './Row'
import { FiDelete } from "react-icons/fi";
import { IoMdReturnRight } from "react-icons/io";

const Keyboard = ({ unusedLetters, handleKeyDown }) => {

    const keyBoardChars = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        [<IoMdReturnRight key={"ENTER"} />, "Z", "X", "C", "V", "B", "N", "M", <FiDelete key={"BACKSPACE"} />],
    ]

    return (
        <div className='board keyboard'>
            {keyBoardChars.map((row, idx) =>
                <Row
                    key={idx}
                    row={row}
                    isKeyboard={true}
                    unusedLetters={unusedLetters}
                    handleKeyDown={handleKeyDown} />
            )}
        </div>
    )
}

export default Keyboard