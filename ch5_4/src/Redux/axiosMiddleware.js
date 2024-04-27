import axios from 'axios';
import { handleData } from './dataSlice';

const axiosMiddleware = (store) => (next) => (action) => {
  if (action.type === 'SEARCH') {
    const terms = action.payload;
    if (terms) {
      (async () => {
        try {
          store.dispatch(
            handleData({
              loading: true,
              data: null,
              error: null,
            })
          );

          const response = await axios.get('http://localhost:5000/search', { params: { terms } });

          store.dispatch(
            handleData({
              loading: false,
              error: null,
              data: response.data,
            })
          );
        } catch (err) {
          console.log(err);
          store.dispatch(
            handleData({
              loading: false,
              error: err?.message,
              data: null,
            })
          );
        }
      })();
    }
  }

  return next(action);
};

export default axiosMiddleware;
