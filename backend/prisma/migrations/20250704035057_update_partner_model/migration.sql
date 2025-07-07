/*
  Warnings:

  - You are about to drop the column `description` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Partner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "description",
DROP COLUMN "website";
