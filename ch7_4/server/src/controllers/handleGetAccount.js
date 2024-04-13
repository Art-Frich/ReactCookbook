import { sessions } from '../lib/constants.js';
import secured from '../lib/secured.js';

/**
 * по id из кук получаем данные активного пользователя и возвращаем их
 */
export default function handleGetAccount() {
  secured((request, response) => {
    const sessionID = request.cookies['__session'];
    const { user } = sessions[sessionID];
    response.send({ user });
  });
}
