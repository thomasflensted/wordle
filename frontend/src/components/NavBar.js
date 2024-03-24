import React, { useState } from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useEffect } from 'react';

const NavBar = ({ setShowAboutScreen }) => {

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.classList = theme;
        localStorage.setItem("theme", theme);
    }, [theme])

    return (
        <nav className='nav-bar'>
            <ul className="nav-list nav-list-outer">

                <li
                    className="nav-item"
                    onClick={() => setShowAboutScreen(true)}>
                    <FaRegQuestionCircle />
                </li>

                <li className="nav-item">WORDLE</li>

                <li
                    className="nav-item"
                    onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>
                    {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
                </li>

            </ul>
        </nav>
    )
}

export default NavBar