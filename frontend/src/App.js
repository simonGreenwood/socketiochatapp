import React, {useState} from "react"
import Login from "./components/Login"
import Main from "./components/Main"

const App = () => {
  const [username,setUsername] = useState('')
  const updateUsername = (name) => {
    console.log(name)
    setUsername(name)
  }// <Login username={username} updateUsername={(name => updateUsername(name))}/> : <Main/>
  return (
    <div>
      {username ? <Main username={username}/> : <Login username={username} updateUsername={(name => updateUsername(name))}/>}
    </div>
  );
}

export default App
