// run with ts-node
// npx ts-node seed.ts
import { prismaAccessor } from '../../../src/dbClient';
import { readFile } from 'fs/promises';
const SEED_DATA_FILE = './stores.json';
const prisma = prismaAccessor();

let count = 0;

// read data
readFile(SEED_DATA_FILE, { encoding: 'utf8' }).then((SEED_DATA_RAW) => {
  const seedData = JSON.parse(SEED_DATA_RAW) as DCStore[];
  seedData.forEach(store => {
    prisma.store.upsert({
      select: { display_name: true },
      where: {
        id: store.id+1,
      },
      update: {
          display_name: store.display_name,
          link: store.link,
          store_type: store.store_type,
      },
      create: {
        display_name: store.display_name,
        link: store.link,
        store_type: store.store_type,
      },
    }).then(_ => count++);
  });
});

// types

type DCStore = {
  id: number;
  display_name: string;
  link: string;
  store_type: DCStoreType;
};

enum DCStoreType {
  RETAILER = 'RETAILER',
  FACTORY = 'FACTORY',
  PLAYER = 'PLAYER',
}

