import { useEffect, useState } from 'react';
const useOnline = () => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    if (window.addEventListener) {
      window.addEventListener('online', handleOnline, false);
      window.addEventListener('offline', handleOffline, false);
    } else {
      document.body.ononline = () => setOnline(true);
      document.body.onoffline = () => setOnline(false);
    }

    // это ведь поможет избежать утечки памяти?
    // или в этом нет необходимости?
    // почему автор не указал этого в своём рецепте?
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('online', handleOnline, false);
        window.removeEventListener('offline', handleOffline, false);
      }
    };
  }, []);

  return online;
};

export default useOnline;
