import { generateAssertionOptions } from '@simplewebauthn/server';
import { users } from '../constants';
import { rpID } from '../constants';

export default function handleStartVerify(request, response) {
  const { userID } = request.body;
  const user = users.find((u) => u.id === userID);

  const options = generateAssertionOptions({
    allowCredentials: user.devices.map((dev) => ({
      id: dev.credentialID,
      type: 'public-key',
    })),
    attestation: 'direct',
    //    extensions: {
    //      credProps: true,
    //    },
    rpID,
  });

  user.currentChallenge = options.challenge;
  console.log('XXXXX options', options);
  response.send(options);
}
