import { useEffect, useState } from 'react';
const useOnline = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline, false);
    window.addEventListener('offline', handleOffline, false);

    return () => {
      window.removeEventListener('online', handleOnline, false);
      window.removeEventListener('offline', handleOffline, false);
    };
  }, []);

  return online;
};

export default useOnline;
