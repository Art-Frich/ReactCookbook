import { generateAssertionOptions } from '@simplewebauthn/server';
import { rpID, users } from '../lib/constants.js';

/**
 * Код найдёт пользователя по ID из тела запроса и возвращает набор правил для верификации
 * Набор правил состоит из публичного ключа на основе "слепков" этих ключей в БД
 * @param {*} request
 * @param {*} response
 */
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

// GPT 4o lection:

// 'direct': Это означает, что клиент должен предоставить полную информацию об устройстве (например, сертификат производителя устройства). Это может использоваться для высокой степени доверия к устройству.
// 'indirect': В этом случае информация об устройстве может быть предоставлена через посредника, и клиент получает только подтверждение от посредника.
// 'none': При этой опции аттестация не производится. Серверу не требуется информация о самом устройстве, только публичный ключ.

// type: 'public-key' указывает, что используется аутентификация с помощью публичного ключа. В контексте WebAuthn это единственный допустимый тип.
