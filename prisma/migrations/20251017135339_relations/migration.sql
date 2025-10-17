/*
  Warnings:

  - You are about to drop the column `categoryId` on the `posts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `postCategories_postId_fkey` ON `postcategories`;

-- DropIndex
DROP INDEX `posts_categoryId_fkey` ON `posts`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `categoryId`;

-- AddForeignKey
ALTER TABLE `postcategories` ADD CONSTRAINT `postcategories_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postcategories` ADD CONSTRAINT `postcategories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
