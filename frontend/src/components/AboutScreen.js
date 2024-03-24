import React from 'react'
import { useRef, useEffect } from 'react'

const AboutScreen = ({ setShowAboutScreen }) => {

    const ref = useRef(null);
    useEffect(() => {
        ref.current.focus();
    }, [])

    return (
        <div className="pause-background faded-bg">
            <div className="pause-content dialogue">
                <p className="about-desc">This is a replica of the New York Times' word game, <a target="_blank" rel="noreferrer"
                    href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>. I made it to practice my
                    programming skills. The <a target="_blank" rel="noreferrer" href="https://github.com/thomasflensted/wordle-frontend-refactor">frontend</a> is made in React
                    and the <a target="_blank" rel="noreferrer" href="https://github.com/thomasflensted/wordle-backend-refactor">backend</a> in
                    Express/Node. Get to know mere <a target="_blank" rel="noreferrer" href="https://thomasflensted.com/">here.</a></p>
                <button
                    className="btn"
                    ref={ref}
                    onClick={() => setShowAboutScreen(false)}>Close</button>
            </div>
        </div>
    )
}

export default AboutScreen