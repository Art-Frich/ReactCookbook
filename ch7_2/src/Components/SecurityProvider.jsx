import { useState } from 'react'
import SecurityContext from '../SecureContext/SecurityContext';

export default function SecurityProvider (props) {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <SecurityContext.Provider
    value={{
      login: (username, password) => {
        if (username === 'fred' && password === 'password') {
          setIsLogged(true)
          alert('Logged')
        } else {
          alert('Uncorrect')
        };
      },
      logout: () => setIsLogged(false),
      isLogged,
    }}
    >
      {props.children}
    </SecurityContext.Provider>
  )
}