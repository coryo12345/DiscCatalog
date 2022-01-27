// index.js
import * as express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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

app.listen(PORT, () => console.log(`API Listening on port ${PORT}`));
