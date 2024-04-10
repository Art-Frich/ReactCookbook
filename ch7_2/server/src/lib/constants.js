// имитация БД пользователей
export const users = [
  {
    id: '1234',
    username: 'freda',
    password: 'mypassword',
    devices: [],
    authenticators: {},
  },
];

export const sessions = {};

// RP - Relying Party
export const rpName = 'Physical Token Server';
export const rpID = 'localhost';
export const origin = `http://${rpID}:3000`;
