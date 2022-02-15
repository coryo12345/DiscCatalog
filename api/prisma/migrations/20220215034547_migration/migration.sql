/*
  Warnings:

  - You are about to drop the column `public` on the `DiscMeta` table. All the data in the column will be lost.
  - Made the column `userId` on table `Disc` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Disc" DROP CONSTRAINT "Disc_userId_fkey";

-- AlterTable
ALTER TABLE "Disc" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "DiscMeta" DROP COLUMN "public";

-- AddForeignKey
ALTER TABLE "Disc" ADD CONSTRAINT "Disc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
