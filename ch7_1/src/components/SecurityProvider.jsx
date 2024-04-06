import { useState } from 'react'
import axios from 'axios';
import SecurityContext from '../secureContext/securityContext';
import Login from '../pages/Login'

export default function SecurityProvider (props) {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <SecurityContext.Provider
    value={{
      login: async (username, password) => {
        const res = await axios.post('/api/login', {username, password});
        if (res.ok) {
          setIsLogged(true);
          alert('Logged')
        } else {
          alert('Uncorrect')
        };
      },
      logout: async () => { 
        const res = await axios.post('/api/logout');
        if (res.ok) {
          setIsLogged(false);
          alert('Logout')
        } else {
          alert("Не получилось разлогиниться")
        }
      },
      onFailure: () => setIsLogged(false),
      isLogged,
    }}
    >
      {isLogged ? props.children : <Login />}
    </SecurityContext.Provider>
  )
}