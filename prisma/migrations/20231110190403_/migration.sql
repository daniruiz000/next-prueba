/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nie]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `dni` VARCHAR(191) NULL,
    ADD COLUMN `nie` VARCHAR(191) NULL,
    MODIFY `foto` LONGBLOB NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_dni_key` ON `User`(`dni`);

-- CreateIndex
CREATE UNIQUE INDEX `User_nie_key` ON `User`(`nie`);
