import { users, sessions } from './constants.js';

export default function handleLogin(request, response) {
  const { username, password } = request.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return response.status(403).send({ message: 'Invalid username or password' });
  }
  if (Object.keys(user.authenticators).length) {
    return response.status(200).send({
      userID: user.id,
      message: 'Security key required',
      twoFactorNeeded: true,
    });
  }
  const newSession = Math.random();
  sessions[newSession] = { user };
  return response.status(200).cookie('__session', newSession).send({ userID: user.id, message: 'Logged in' });
}
