import React from 'react'
import Tile from './Tile'
import { motion } from "framer-motion"

const Row = ({ row, isKeyboard, unusedLetters, classRow, handleKeyDown, thisRow, currentRow }) => {

    const colors = {
        green: {
            before: "rgba(46, 204, 113, 0)",
            after: "rgba(46, 204, 113, 1)"
        },
        orange: {
            before: "rgba(255, 159, 67, 0)",
            after: "rgba(255, 159, 67, 1)"
        },
        gray: {
            before: "rgba(189, 195, 199, 0)",
            after: "rgba(189, 195, 199, 1)"
        },
    }

    const isDark = document.body.classList[0] === "dark";

    return (
        <div className="row">
            {row.map((char, idx) => {
                if (isKeyboard) {
                    return <Tile
                        key={idx}
                        char={char}
                        grayOut={unusedLetters.includes(char)}
                        isKeyboard={true}
                        handleKeyDown={handleKeyDown} />
                } else {
                    if (thisRow === currentRow - 1) {
                        return (
                            <motion.div
                                key={idx}
                                className={`tile tile-colored tile-small ${classRow[idx]}`}
                                animate={{
                                    scale: [1, 1.1, 1],
                                    backgroundColor: [colors[classRow[idx]].before, colors[classRow[idx]].after],
                                    border: isDark ? ["1px solid white", "none"] : ["1px solid black", "none"],
                                    color: isDark ? ["white", "white"] : ["black", "white"],
                                }}
                                transition={{ duration: .25, delay: idx * .25 }}>{char}</motion.div>
                        )
                    } else {
                        return (
                            <Tile
                                key={idx}
                                char={char}
                                grayOut={isKeyboard && unusedLetters.includes(char)}
                                color={isKeyboard ? "" : classRow[idx]}
                                isKeyboard={isKeyboard}
                                handleKeyDown={handleKeyDown} />
                        )
                    }
                }
            })}
        </div>
    )
}

export default Row