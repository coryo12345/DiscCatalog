-- AlterTable
ALTER TABLE "Disc" ADD COLUMN     "image" TEXT,
ADD COLUMN     "shared" BOOLEAN NOT NULL DEFAULT false;
