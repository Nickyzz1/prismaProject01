/*
  Warnings:

  - You are about to alter the column `capture_percentual` on the `pokedex` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `pokedex` MODIFY `capture_percentual` DECIMAL(65, 30) NOT NULL;
