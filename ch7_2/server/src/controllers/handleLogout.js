import { sessions } from '../lib/constants.js';

/**
 * Удаляет активную сессию по id из кук.
 * Чистит куки.
 * @param {*} request
 * @param {*} response
 * @returns
 */
export default function handleLogout(request, response) {
  // если нам известна сессия с id, который мы нашли в куках, ...
  // тогда удалим её
  if (request.cookies && request.cookies['__session']) {
    delete sessions[request.cookies['__session']];
  }

  // очистить куки и вернуть 200
  return response.status(200).clearCookie('__session').send({ message: 'Logged out' });
}
