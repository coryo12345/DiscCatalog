import * as express from 'express';
import { prismaAccessor } from '../dbClient';
import dcUserRow from '../middleware/dcUserRow';
import { DCRequest } from '../types/DCHttp';
const prisma = prismaAccessor();
const router = express.Router();

// TODO make this only discs for the current user
router.get('/discs', async (_, res) => {
  const result = await prisma.disc.findMany();
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

// TODO get public discs

export default router;
