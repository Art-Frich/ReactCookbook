import { sessions } from '../constants';

const secured = (callback) => async (req, res) => {
  if (!req.cookies || !req.cookies['__session']) {
    res.status(401).send('Not authorized');
    return;
  }

  const isValid = req.cookies['__session'] && sessions[req.cookies['__session']];

  if (!isValid) {
    res.status(401).send('Not authorized');
    return;
  }

  await callback(req, res);
};

export default secured;
