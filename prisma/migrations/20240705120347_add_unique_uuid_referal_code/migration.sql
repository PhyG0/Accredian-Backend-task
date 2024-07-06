/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referralCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Reward` DROP FOREIGN KEY `Reward_userId_fkey`;

-- AlterTable
ALTER TABLE `Reward` DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `isReferralCodeUsed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `referralCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_referralCode_key` ON `User`(`referralCode`);

-- AddForeignKey
ALTER TABLE `Reward` ADD CONSTRAINT `Reward_userName_fkey` FOREIGN KEY (`userName`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
