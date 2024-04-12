import { verifyAttestationResponse } from '@simplewebauthn/server';
import { rpID, sessions, origin } from '../lib/constants.js';

export default async function handleRegister(request, response) {
  const { attestation } = request.body;
  const sessionID = request.cookies['__session'];
  const { user } = sessions[sessionID];

  const expectedChallenge = user.currentChallenge;

  let verification;
  try {
    // проверяем, что
    // - домен имеет право передавать данные
    // - конкретный сайт в домене имеет право передавать данные
    // - данные не были изменены при обмене с клиентом и не используются повторно
    // - слепок физ. ключа соответствует БД
    verification = await verifyAttestationResponse({
      // далее список опций для криптографическго слепка
      credential: attestation, // данные физ. ключа с клиента

      // проверяет, что уникальный ключ созданный при создании запроса на верификацию и ключ в attestation совпадают
      expectedChallenge,

      // проверяем, что конкретный выступает клиентом
      // origin, ВРОДЕ БЫ означает сайт, с которого поступил запрос
      // может быть массивом значение
      expectedOrigin: origin,

      // проверяем, что текущий домен равен rpID в "слепке"
      // домен в данном случае - сайт, с которого поступил запрос на аттестацию изначально и на авторизацию сейчас
      // может быть массивом значение
      expectedRPID: rpID,
    });
  } catch (error) {
    console.error(error);
    return response.status(400).send({ error: error.message });
  }

  // разбираем получившийся "слепок"
  const { verified, authenticatorInfo } = verification;
  // низкоуровневые данные слепка
  const { base64PublicKey, base64CredentialID, counter } = authenticatorInfo;
  //
  user.authenticators[base64CredentialID] = {
    // уникальный идентификатор физ. ключа
    credentialID: base64CredentialID,
    // публичный ключ для шифрования данных на клиенте
    publicKey: base64PublicKey,
    // количество использований физ. ключа. Сравниваемое значение. Защищает от атак повторного использования
    counter,
  };

  user.devices.push({ credentialID: base64CredentialID });

  response.send({ verified });
}
