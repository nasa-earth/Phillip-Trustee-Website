/*
  Warnings:

  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `registrationUrl` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "endDate",
DROP COLUMN "isPublished",
DROP COLUMN "registrationUrl",
DROP COLUMN "startDate";

-- CreateTable
CREATE TABLE "EventImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
