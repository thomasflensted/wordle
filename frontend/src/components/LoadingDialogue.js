import React from 'react'
import BarLoader from "react-spinners/BarLoader";

const LoadingDialogue = () => {

    const isDark = localStorage.getItem("theme") === "dark";
    const color = isDark ? "#FFFFFF" : "#000000";
    const css = {
        background: isDark ? "#353b48" : "#dcdde1",
    }

    return (
        <div className="loading-dialogue">
            <BarLoader width={170} color={color} cssOverride={css} />
            <h2 className='loading-text'>Waiting For Server...</h2>
            <p className='loading-desc'>This site runs on a free tier server, which spins down after 15 minutes of inactivity. That's why you're seeing this, but it's only on the first load.</p>
        </div >
    )
}

export default LoadingDialogue