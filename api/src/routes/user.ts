import * as express from 'express';
import { prismaAccessor } from '../dbClient';
const prisma = prismaAccessor();
const router = express.Router();

router.get('/currentUser', async (req, res) => {
  // const result = await prisma.
});

router.get('/users', async (_, res) => {
  const result = await prisma.user.findMany();
  res.json(result);
});

export default router;
