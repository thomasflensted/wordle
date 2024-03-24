import React from 'react'
import Tile from './Tile';
import { v4 as uuidv4 } from 'uuid';
import CountUp from 'react-countup';


const GameOverScreen = ({ won, word, stats, resetGame, setWord, fetchWord }) => {

    const msg = won ? "Well done!" : "No success this time! The word was:"
    const successRate = Math.round(stats.wins / stats.total * 100);
    const wordArr = word.split("");
    const handleClick = async () => {
        resetGame();
        const newWord = await fetchWord();
        setWord(newWord);
    }

    return (
        <div className="pause-background faded-bg">
            <div className="pause-content dialogue">
                <h2 className="game-over-heading">{msg}</h2>
                <div className="row game-over-row">
                    {wordArr.map(letter =>
                        <Tile
                            key={uuidv4()}
                            char={letter}
                            grayOut={false}
                            color={won ? "green" : "gray"} />
                    )}
                </div>
                <h2 className="game-over-heading">Statistics</h2>
                <div className="statistics-row">
                    <div className="statistics-column">
                        <CountUp className='statistic' end={stats.total} duration={2} />
                        <p className="statistic-text">Total Attempts</p>
                    </div>
                    <div className="statistics-column">
                        <CountUp className='statistic' end={successRate} suffix=' %' duration={2} />
                        <p className="statistic-text">Success Rate</p>
                    </div>
                    <div className="statistics-column">
                        <CountUp className='statistic' end={stats.streak} duration={2} />
                        <p className="statistic-text">Current Streak</p>
                    </div>
                </div>
                <button
                    className="btn"
                    onClick={handleClick}>Play Again
                </button>
            </div>
        </div>
    )
}

export default GameOverScreen