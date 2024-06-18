// имитация БД пользователей
export const users = [
  {
    id: '1234',
    username: 'fred',
    password: 'password',
    devices: [],
    authenticators: {},
  },
];

export const sessions = {};

// RP - Relying Party - передающая сторона, это приложение, которое сгенерировало запрос
export const rpName = 'Physical Token Server';

// для локалки
export const rpID = 'localhost';
export const origin = `http://${rpID}:3000`;

// export const rpID = 'loca.lt';
// export const origin = `https://slimy-zebra-70.loca.lt`;
