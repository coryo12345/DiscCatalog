import { PrismaClient } from '@prisma/client';
import env from './env';

// setup
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${env['POSTGRES_USER']}:${env['POSTGRES_PASSWORD']}@${env['DB_HOST']}:5432/${env['POSTGRES_DB']}?schema=disc`,
    },
  },
});

export function prismaAccessor() {
  return prisma;
}
