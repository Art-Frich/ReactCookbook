import { useEffect, useState } from 'react';
import useSecurity from '../../secureContext/useSecurity';
import axios from 'axios';

const useOffers = () => {
  const security = useSecurity();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('/api/offers');
        setOffers(result.data);
      } catch (err) {
        const status = err.response && err.response.status;
        if (status === 401) {
          security.onFailure(); // разлогиниваем пользователя, а т.к. он разлогинен, то контент ему закрыт до логининга
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: offers };
};

export default useOffers;
