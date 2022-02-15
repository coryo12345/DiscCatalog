import * as express from 'express';
import dcUserRow from '../middleware/dcUserRow';
import { prismaAccessor } from '../dbClient';
import { DCRequest } from '../types/DCHttp';
const prisma = prismaAccessor();
const router = express.Router();

router.get('/currentUser', dcUserRow, async (req, res) => {
  const userId = (req as DCRequest).disc.id;
  const users = await prisma.user.findMany({
    select: { displayName: true },
    where: { id: userId }
  });
  res.json(users[0]);
});

router.post('/updateCurrentUser', dcUserRow, async (req, res) => {
  const userId = (req as DCRequest).disc.id;
  const name = req.body.displayName;
  if (!name) {
    res.sendStatus(400);
  }
  await prisma.user.update({
    select: { id: true },
    data: { displayName: name },
    where: { id: userId }
  });
  res.json({});
});

export default router;
