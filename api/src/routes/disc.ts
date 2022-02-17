import * as express from 'express';
import { prismaAccessor } from '../dbClient';
import dcUserRow from '../middleware/dcUserRow';
import { DCRequest } from '../types/DCHttp';
const prisma = prismaAccessor();
const router = express.Router();

router.get('/discs/all', async (_, res) => {
  // TODO pagination
  const result = await prisma.disc.findMany({
    select: {
      brand: true,
      mold: true,
      plastic: true,
      weight: true,
      run: true,
      foil: true,
      stamp: true,
      color: true,
      user: {
        select: {
          displayName: true
        }
      }
    },
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
        brand: disc.brand,
        mold: disc.mold,
        plastic: disc.plastic,
        weight: disc.weight,
        run: disc.run,
        foil: disc.foil,
        stamp: disc.stamp,
        color: disc.color,
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
    console.error(err);
    res.sendStatus(500);
  }
});

// TODO disc update endpoint
// must verify user owns this disc

export default router;
