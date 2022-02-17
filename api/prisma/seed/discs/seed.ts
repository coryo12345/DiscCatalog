// run with ts-node
// npx ts-node seed.ts
import { prismaAccessor } from '../../../src/dbClient';
import { readFile } from 'fs/promises';
const SEED_DATA_FILE = './discs.json';
const prisma = prismaAccessor();

// let userCount = 0;
let count = 0;

// read data
readFile(SEED_DATA_FILE, { encoding: 'utf8' }).then(async (SEED_DATA_RAW) => {
  const seedData = JSON.parse(SEED_DATA_RAW) as DCDiscFile;
  // make users
  for (let i = 0; i < seedData.users; i++) {
    await prisma.user.upsert({
      select: { id: true },
      where: {
        id: i + 1,
      },
      update: {
        authId: `seeduser${i + 1}`,
        displayName: `seeduser${i + 1}`,
      },
      create: {
        authId: `seeduser${i + 1}`,
        displayName: `seeduser${i + 1}`,
      },
    });
  }
  // add discs
  seedData.discs.forEach((disc) => {
    prisma.disc
      .upsert({
        select: { mold: true },
        where: {
          id: disc.id + 1,
        },
        update: {
          userId: disc.userId,
          brand: disc.brand,
          mold: disc.mold,
          plastic: disc.plastic,
          weight: disc.weight,
          run: disc.run,
          foil: disc.foil,
          stamp: disc.stamp,
          color: disc.color,
          shared: disc.shared,
        },
        create: {
          userId: disc.userId,
          brand: disc.brand,
          mold: disc.mold,
          plastic: disc.plastic,
          weight: disc.weight,
          run: disc.run,
          foil: disc.foil,
          stamp: disc.stamp,
          color: disc.color,
          shared: disc.shared,
        },
      })
      .then((_) => count++);
  });
});

// types

type DCDiscFile = {
  users: number;
  discs: DCDisc[];
};

type DCDisc = {
  id: number;
  userId: number;
  brand: string;
  mold: string;
  plastic: string;
  weight: number;
  run: string;
  foil: string;
  stamp: string;
  color: string;
  shared: boolean;
};
