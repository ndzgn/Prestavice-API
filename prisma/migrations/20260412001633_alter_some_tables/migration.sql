/*
  Warnings:

  - You are about to drop the column `picture` on the `Artisans` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Users` table. All the data in the column will be lost.
  - Made the column `userId` on table `Notifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Offers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `artisanId` on table `Quotation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `offerId` on table `Quotation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `artisanId` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quotationId` on table `Tools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Artisans" DROP COLUMN "picture",
ADD COLUMN     "pictureUrl" TEXT;

-- AlterTable
ALTER TABLE "Notifications" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Offers" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Quotation" ALTER COLUMN "artisanId" SET NOT NULL,
ALTER COLUMN "offerId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "artisanId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tools" ALTER COLUMN "quotationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "picture",
ADD COLUMN     "pictureUrl" TEXT;
