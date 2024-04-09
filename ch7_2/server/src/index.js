import express from 'express';
import cookieParser from 'cookie-parser';
import handleLogin from './controllers/handleLogin.js';
import handleLogout from './controllers/handleLogout.js';
import handleGetAccount from './controllers/handleGetAccount.js';
import handleStartRegister from './controllers/handleStartRegister.js';
import handleStartFingerprint from './controllers/handleStartFingerprint.js';
import handleRegister from './controllers/handleRegister.js';
import handleStartVerify from './controllers/handleStartVerify.js';
import handleVerify from './controllers/handleVerify.js';

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post('/login', handleLogin);
app.post('/logout', handleLogout);
app.get('/account', handleGetAccount);
app.post('/startRegister', handleStartRegister);
app.post('/startFingerprint', handleStartFingerprint);
app.post('/register', handleRegister);
app.post('/startVerify', handleStartVerify);
app.post('/verify', handleVerify);

app.listen(5000, () => console.log('🚀 Launched on port 5000!'));
