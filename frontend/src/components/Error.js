import React from 'react'

const Error = () => {
    return (
        <div className="error">
            <h2>There was an error on the server. Please reload the page. If that doesn't work, come back again later.</h2>
            <button className='btn' onClick={() => window.location.reload(false)}>Reload the Page</button>
        </div>
    )
}

export default Error