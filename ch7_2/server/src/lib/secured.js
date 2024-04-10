import { sessions } from './constants.js';

/**
 * Проверяет, что есть нужные куки и активная сессия по id из кук.
 * Затем выполняет callback или выбрасывает ошибку.
 * @param {*} callback
 * @returns
 */
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
