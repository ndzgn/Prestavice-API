/*
  Warnings:

  - You are about to alter the column `phone` on the `Artisans` table. The data in that column could be lost. The data in that column will be cast from `Char(20)` to `Char(9)`.

*/
-- AlterTable
ALTER TABLE "Artisans" ALTER COLUMN "phone" SET DATA TYPE CHAR(9);
