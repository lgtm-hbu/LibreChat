import * as url from 'url';
import { Hono } from 'hono';
import * as path from 'path';
import { sendFile } from './sendFile';

const app = new Hono();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.post('/file-service', async (c) => {
  const reqData = await c.req.json();
  console.dir(reqData);
  const fileName = 'uploads/temp/652ac880c4102a77fe54c5db/competition.pdf';
  const root = __dirname.split('/file-service')[0];
  const filePath = path.join(root, fileName);
  await sendFile(filePath);

  return c.json({ ok: true });
});

export default app;
