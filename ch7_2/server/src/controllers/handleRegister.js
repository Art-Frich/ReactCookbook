import { verifyAttestationResponse } from '@simplewebauthn/server';
import { rpID, sessions } from '../constants';

export default async function handleRegister(request, response) {
  const { attestation } = request.body;
  const sessionID = request.cookies['__session'];
  const { user } = sessions[sessionID];

  const expectedChallenge = user.currentChallenge;

  let verification;
  try {
    verification = await verifyAttestationResponse({
      credential: attestation,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).send({ error: error.message });
  }

  const { verified, authenticatorInfo } = verification;

  const { base64PublicKey, base64CredentialID, counter } = authenticatorInfo;

  user.authenticators[base64CredentialID] = {
    credentialID: base64CredentialID,
    publicKey: base64PublicKey,
    counter,
  };

  user.devices.push({ credentialID: base64CredentialID });

  response.send({ verified });
}
