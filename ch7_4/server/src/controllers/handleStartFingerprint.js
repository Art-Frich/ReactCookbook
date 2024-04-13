import { generateAttestationOptions } from '@simplewebauthn/server';
import { rpName, rpID, sessions } from '../lib/constants.js';

export default function handleStartFingerprint(request, response) {
  const sessionID = request.cookies['__session'];
  const { user } = sessions[sessionID];

  // https://simplewebauthn.dev/docs/packages/server
  // генерируем набор правил для регистрации нового устройства
  const options = generateAttestationOptions({
    rpName, // произвольная текстовая строка, описывающая приложение
    rpID, // имя текущего домена
    userID: user.id, // id пользователя - произвольно
    userName: user.username, // имя пользователя - произовльно

    // список уже зарегистрированных устройств, чтобы избежать двойной регистрации
    excludeCredentials: user.devices.map((dev) => ({
      id: dev.credentialID,
      type: 'public-key',
    })),

    // список действий при активации устройства
    authenticatorSelection: {
      // использовать аппаратные средства авторизации (отпечаток пальца, камера)
      authenticatorAttachment: 'platform',
      // двухфакторка всегда
      userVerification: 'required',
    },
    extensions: {
      // Расширение credProps запрашивает устройство возвратить дополнительные свойства учетных данных, которые могут быть полезными для сервера
      credProps: true,
    },
  });

  // вернёт более сложный ответ, содержащий средство проверки подлинности
  options.attestation = 'direct';

  user.currentChallenge = options.challenge;
  console.log('Send back options', options);
  response.send(options);
}
