import { generateAttestationOptions } from '@simplewebauthn/server';
import { rpName, rpID, sessions } from '../lib/constants.js';

export default function handleStartFingerprint(request, response) {
  const sessionID = request.cookies['__session'];
  const { user } = sessions[sessionID];

  const options = generateAttestationOptions({
    rpName,
    rpID,
    userID: user.id,
    userName: user.username,
    excludeCredentials: user.devices.map((dev) => ({
      id: dev.credentialID,
      type: 'public-key',
    })),
    extensions: {
      credProps: true,
    },
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      userVerification: 'required',
    },
  });

  options.attestation = 'direct';

  user.currentChallenge = options.challenge;
  console.log('Send back options', options);
  response.send(options);
}
