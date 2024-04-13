import { useState } from 'react'
import SecurityContext from '../SecureContext/SecurityContext';
import axios from 'axios';
import { get } from '@github/webauthn-json';

export default function SecurityProvider (props) {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = async (username, password) => {
    const { data } = await axios.post('/login', {
      username,
      password,
    })

    // Если бэк нашел в БД "слепки", то он запросит второй ключ
    if (data.twoFactorNeeded) {
      const userID = data.userID;
      // Данная ручка вернет набор опций для двухфакторки
      // Он переберёт все "слепки" из БД, и соберёт их в pub-key в том или ином виде
      // А им мы будем шифровать данные
      const response = await axios.post('/startVerify', {userID});

      // Высокоуровневая обёртка для низкоуровневого navigator.credentials.get,
      const assertion = await get({ publicKey: response.data });
      const response2 = await axios.post('/verify', {
        userID,
        assertion,
      });

      if (response2.data?.verified) {
        setIsLogged(true);
      }

    // инае работаем как с однофакторкой
    } else {
      setIsLogged(true);
    }
    // PS а как мы првоеряем валидность ответа?
  };

  const handleLogout = async () => {
    await axios.post('/logout')
    setIsLogged(false)
    // PS а как мы првоеряем валидность ответа?
  };

  return (
    <SecurityContext.Provider
    value={{
      login: handleLogin,
      logout: handleLogout,
      isLogged,
    }}
    >
      {props.children}
    </SecurityContext.Provider>
  )
}