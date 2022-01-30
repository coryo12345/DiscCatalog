import * as express from 'express';
import { prismaAccessor } from '../dbClient';
const prisma = prismaAccessor();
const router = express.Router();

router.get('/discs', async (_, res) => {
  const result = await prisma.disc.findMany();
  res.json(result);
});

export default router;
