import React from 'react'
import Row from './Row'

const Board = ({ gameState, classes, currentRow, handleKeyDown }) => {

    return (
        <div className='board'>
            {gameState.map((row, idx) =>
                <Row
                    key={idx}
                    thisRow={idx}
                    currentRow={currentRow}
                    row={row}
                    classRow={classes[idx]}
                    isKeyboard={false}
                    handleKeyDown={handleKeyDown} />)
            }
        </div >
    )
}

export default Board