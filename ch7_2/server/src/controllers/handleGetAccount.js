import { sessions } from '../constants';
import secured from '../lib/secured';

export default function handleGetAccount() {
  secured((request, response) => {
    const sessionID = request.cookies['__session'];
    const { user } = sessions[sessionID];
    response.send({ user });
  });
}
