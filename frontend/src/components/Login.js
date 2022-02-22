import React, { useState } from "react"

const Login = ({username,updateUsername}) => {
    const [newUsername, setNewUsername] = useState('')
    return(
        <div>
            <h1>Log In</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                updateUsername(newUsername)

            }}>
                <input value={newUsername} onChange={(event) => setNewUsername(event.target.value)}/>
                <button action="submit">Go</button>
            </form>
        </div>
    )
}
export default Login