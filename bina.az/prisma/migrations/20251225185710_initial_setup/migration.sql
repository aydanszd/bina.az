-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "floor" INTEGER,
    "area" DOUBLE PRECISION,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "rooms" INTEGER,
    "image1" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);
