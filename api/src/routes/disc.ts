import * as express from 'express';
import { prismaAccessor } from '../dbClient';
import dcUserRow from '../middleware/dcUserRow';
import { DCRequest } from '../types/DCHttp';
const prisma = prismaAccessor();
const router = express.Router();

router.get('/discs/all', async (_, res) => {
  // TODO join user to get displayname instead of id
  // TODO pagination
  const result = await prisma.disc.findMany({
    where: {
      shared: true
    }
  });
  res.json(result);
});

router.get('/discs', dcUserRow, async (req, res) => {
  const userId = (req as DCRequest).disc.id;
  const result = await prisma.disc.findMany({
    where: {
      userId: userId
    }
  });
  res.json(result);
});

router.post('/add', dcUserRow, async (req, res) => {
  const userId = (req as DCRequest).disc.id;
  const disc = req.body;
  if (!disc) {
    res.sendStatus(400);
    return;
  }
  try {
    const row = await prisma.disc.create({
      select: {id: true},
      data: {
        userId: userId,
        brand: disc.Brand,
        mold: disc.Mold,
        plastic: disc.Plastic,
        weight: disc.Weight,
        run: disc.Run,
        foil: disc.Foil,
        stamp: disc.Stamp,
        color: disc.Color,
      }
    });
    // TODO test this
    await prisma.discMeta.create({
      select: {id: true},
      data: {
        createdDate: new Date(),
        discId: row.id
      }
    });
    res.json({});
  } catch (err) {
    res.sendStatus(500);
  }
});

// TODO disc update endpoint
// must verify user owns this disc

export default router;
