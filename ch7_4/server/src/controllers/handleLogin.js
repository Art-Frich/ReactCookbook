import { users, sessions } from '../lib/constants.js';

/**
 * Создает объект активной сессии и вешает её id в куку
 * При наличии двухфакторки - требует второй ключ
 * @param {*} request
 * @param {*} response
 * @returns
 */
export default function handleLogin(request, response) {
  const { username, password } = request.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return response.status(403).send({ message: 'Invalid username or password' });
  }

  // если у пользователя есть сохраненные ключи входа
  if (Object.keys(user.authenticators).length) {
    // т.е. если мы нашли ключи используемые для двухфакторки, значит запросить любой из них
    return response.status(200).send({
      userID: user.id,
      message: 'Security key required',
      twoFactorNeeded: true,
    });
  }

  // имитация уникального id
  const newSession = Math.random();

  // добавить в имитацию БД/map-у сессий нового пользователя
  sessions[newSession] = { user };

  // хранить в куках id сессии и вернуть ответ
  return response.status(200).cookie('__session', newSession).send({ userID: user.id, message: 'Logged in' });
}
