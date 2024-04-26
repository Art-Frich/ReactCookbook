import axios from 'axios';
import { useEffect, useState } from 'react';

const useSearch = (url, terms) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setError(null);
    if (terms && url) {
      const source = axios.CancelToken.source();

      (async () => {
        try {
          setLoading(true);
          const response = await axios.get(url, {
            params: { terms },
            cancelToken: source.token,
          });
          setData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }

        return () => {
          source.cancel('previous request cancelled');
        };
      })();
    } else {
      setData([]);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);

  return { data, loading, error };
};

export default useSearch;
