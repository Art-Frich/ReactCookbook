import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

const server = express();

// на любой get запрос сначала пытаемся найти соответствующую статику
server.get(/.(js|css|map|ico|svg|png)$/, express.static(path.resolve(__dirname, '../build')));

// иначе вернуть основную html страницу
server.use('*', async (req, res) => {
  let indexHTML = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), {
    encoding: 'utf-8',
  });

  const app = renderToString(<App />);
  indexHTML = indexHTML.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

  res.contentType('text/html');
  res.status(200);
  return res.send(indexHTML);
});
server.listen(8000, () => {
  console.log('Server running on port 8000');
});
