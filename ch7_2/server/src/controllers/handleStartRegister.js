import { generateAttestationOptions } from '@simplewebauthn/server';
import { sessions } from '../constants';
import { rpName, rpID } from '../constants';

export default function handleStartRegister(request, response) {
  const sessionID = request.cookies['__session'];
  const { user } = sessions[sessionID];
  const userID = user.id;

  const options = generateAttestationOptions({
    rpName,
    rpID,
    userID: userID,
    userName: user.username,
    excludeCredentials: user.devices.map((dev) => ({
      id: dev.credentialID,
      type: 'public-key',
    })),
    authenticatorSelection: { userVerification: 'discouraged' },
    extensions: {
      credProps: true,
    },
  });

  user.currentChallenge = options.challenge;
  response.send(options);
}
