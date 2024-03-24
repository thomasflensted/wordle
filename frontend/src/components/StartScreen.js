import React from 'react'
//import { fetchWord } from '../apiFunctions';

const StartScreen = ({ setShowStartScreen, totalProgress, gameOver, setWord, fetchWord }) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date();
    const today = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    const gameInProgress = totalProgress > 0 && !gameOver;

    const handleClick = async () => {
        setShowStartScreen(false)
        if (!gameInProgress) {
            const word = await fetchWord();
            setWord(word);
        }
    }

    return (
        <div className="pause-background">
            <div className="pause-content">
                <h1 className="start-screen-heading">WORDLE</h1>
                <p className="start-screen-desc">Get 6 chances to guess a 5-letter word.</p>
                <button
                    autoFocus
                    type='submit'
                    className="btn start-btn"
                    onClick={handleClick}>{gameInProgress ? "Continue Where You Left Off" : "Play"}</button>
                <p className="date">{today}</p>
            </div>
        </div>
    )
}

export default StartScreen