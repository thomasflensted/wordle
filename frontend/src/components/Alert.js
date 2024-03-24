import React from 'react'
import { IoAlertCircleSharp } from "react-icons/io5";

const Alert = ({ msg }) => {
    return (
        <div className='alert'>
            <IoAlertCircleSharp className='alert-icon' />
            <p className='alert-text'>{msg}</p>
        </div>
    )
}

export default Alert