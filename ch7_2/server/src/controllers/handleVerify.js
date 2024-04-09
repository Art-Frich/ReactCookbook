import { verifyAssertionResponse } from '@simplewebauthn/server';
import { rpID, sessions, users } from '../constants';

export default async function handleVerify(request, response) {
  const { userID, assertion } = request.body;
  const user = users.find((u) => u.id === userID);

  const expectedChallenge = user.currentChallenge;

  const authenticator = user.authenticators[assertion.id];

  if (!authenticator) {
    response.status(403).send(`Could not find authenticator ${assertion.id} for user ${user.id}`);
  }

  let verification;
  try {
    verification = await verifyAssertionResponse({
      credential: assertion,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).send({ error: error.message });
  }

  const { verified, authenticatorInfo } = verification;

  const { counter } = authenticatorInfo;

  user.authenticators[assertion.id].counter = counter;

  const newSession = Math.random();
  sessions[newSession] = { user };

  response.status(200).cookie('__session', newSession).send({ verified });
}
