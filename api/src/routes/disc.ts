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
        shared: disc.shared,
      }
    });
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

router.post('/update', dcUserRow, async (req, res) => {
  const userId = (req as DCRequest).disc.id;
  const disc = req.body;
  if (!disc) {
    res.sendStatus(400);
    return;
  }
  try {
    // make sure the user owns this disc
    const row = await prisma.disc.findFirst({
      select: { userId: true, id: true },
      where: { id: disc.id, userId: userId }
    });
    if (row === null) {
      // nope.
      res.sendStatus(403);
      return;
    }

    // update
    await prisma.disc.update({
      select: {id: true},
      where: {
        id: disc.id
      },
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
        shared: disc.shared,
      }
    });
    res.json({});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
