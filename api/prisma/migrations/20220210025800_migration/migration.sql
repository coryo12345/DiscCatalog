-- CreateEnum
CREATE TYPE "StoreType" AS ENUM ('FACTORY', 'RETAILER', 'PLAYER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "authId" TEXT NOT NULL,
    "displayName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disc" (
    "id" SERIAL NOT NULL,
    "brand" TEXT,
    "mold" TEXT,
    "plastic" TEXT,
    "weight" INTEGER,
    "run" TEXT,
    "foil" TEXT,
    "stamp" TEXT,
    "color" TEXT,
    "shared" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Disc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscMeta" (
    "id" SERIAL NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL,
    "public" BOOLEAN NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "discId" INTEGER NOT NULL,

    CONSTRAINT "DiscMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "display_name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "store_type" "StoreType" NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscMeta_discId_key" ON "DiscMeta"("discId");

-- AddForeignKey
ALTER TABLE "Disc" ADD CONSTRAINT "Disc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscMeta" ADD CONSTRAINT "DiscMeta_discId_fkey" FOREIGN KEY ("discId") REFERENCES "Disc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
