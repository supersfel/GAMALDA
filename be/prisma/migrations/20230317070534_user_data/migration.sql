/*
  Warnings:

  - Added the required column `access_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `access_token` VARCHAR(191) NOT NULL;
