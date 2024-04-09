import { sessions } from '../constants';

export default function handleLogout(request, response) {
  if (request.cookies && request.cookies['__session']) {
    delete sessions[request.cookies['__session']];
  }

  return response.status(200).clearCookie('__session').send({ message: 'Logged out' });
}
