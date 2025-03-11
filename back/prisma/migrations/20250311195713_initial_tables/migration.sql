/*
  Warnings:

  - Added the required column `money` to the `IUSer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `PokeBall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `iuser` ADD COLUMN `money` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pokeball` ADD COLUMN `price` INTEGER NOT NULL;
