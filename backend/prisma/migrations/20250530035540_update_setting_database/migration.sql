/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `Setting` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Setting` table. All the data in the column will be lost.
  - Added the required column `siteTitle` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Setting_key_key";

-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "createdAt",
DROP COLUMN "key",
DROP COLUMN "value",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "siteLogo" TEXT,
ADD COLUMN     "siteTitle" TEXT NOT NULL;
