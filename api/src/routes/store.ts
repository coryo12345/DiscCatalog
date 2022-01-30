import * as express from 'express';
import { prismaAccessor } from '../dbClient';
const prisma = prismaAccessor();
const router = express.Router();

router.get('/stores', async (_, res) => {
  const result = await prisma.store.findMany();
  res.json(result);
});

export default router;
