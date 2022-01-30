// index.js
// imports
import * as express from 'express';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import path = require('path');

// build db creds
const envFile = path.resolve(__dirname, '../../.env');
const env = {
  'POSTGRES_PASSWORD': '',
  'POSTGRES_USER': '',
  'POSTGRES_DB': '',
  'DB_HOST': '',
};
try {
  const envData = fs.readFileSync(envFile, 'utf-8');
  // override file exists
  // @ts-ignore
  let envObj: any = envData.split('\n').reduce((prev, curr) => {let [a, b] = curr.split('='); prev[a] = b; return prev;}, {});
  env['POSTGRES_PASSWORD'] = envObj['POSTGRES_PASSWORD'];
  env['POSTGRES_USER'] = envObj['POSTGRES_USER'];
  env['POSTGRES_DB'] = envObj['POSTGRES_DB'];
  env['DB_HOST'] = envObj['DB_HOST'];
} catch (err: any) {
  // override file can't be read: attempt to use process env
  env['POSTGRES_PASSWORD'] = process.env['POSTGRES_PASSWORD'] as string;
  env['POSTGRES_USER'] = process.env['POSTGRES_USER'] as string;
  env['POSTGRES_DB'] = process.env['POSTGRES_DB'] as string;
  env['DB_HOST'] = process.env['DB_HOST'] as string;
}

// setup 
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${env['POSTGRES_USER']}:${env['POSTGRES_PASSWORD']}@${env['DB_HOST']}:5432/${env['POSTGRES_DB']}?schema=disc`,
    },
  },
});
const app = express();
const PORT = process.env.port ? process.env.port : 3001;

app.use(express.json());

app.post(`/api/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });
  res.json(result);
});

app.get('/api/users', async (_, res) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

app.get('/api/discs', async (_, res) => {
  const result = await prisma.disc.findMany();
  res.json(result);
});

app.listen(PORT, () => console.log(`API Listening on port ${PORT}`));
