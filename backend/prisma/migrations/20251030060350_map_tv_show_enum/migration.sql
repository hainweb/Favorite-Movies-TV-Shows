/*
  Warnings:

  - The values [TV_Show] on the enum `Entry_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Entry` MODIFY `type` ENUM('Movie', 'TV Show') NOT NULL;
