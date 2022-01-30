import * as express from 'express';
import { prismaAccessor } from '../dbClient';
const prisma = prismaAccessor();
const router = express.Router();

router.post(`/create`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });
  res.json(result);
});

router.get('/users', async (_, res) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

export default router;
