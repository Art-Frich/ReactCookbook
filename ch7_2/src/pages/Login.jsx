import { useState } from 'react'
import useSecurity from '../SecureContext/useSecurity'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useSecurity()
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <h1>Login Page</h1>

      <p>You need to log in. (hint: try fred/password)</p>

      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
      />

      <br />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <br />
      <button onClick={() => {
        login(username, password)
        navigate('/home');
      }}>
        Login
      </button>
    </div>
  )
}

export default Login