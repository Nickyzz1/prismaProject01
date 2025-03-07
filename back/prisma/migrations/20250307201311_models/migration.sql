/*
  Warnings:

  - You are about to drop the column `capture_percentual` on the `pokedex` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `pokedex` table. All the data in the column will be lost.
  - You are about to drop the column `quantityToPlayer` on the `pokedex` table. All the data in the column will be lost.
  - You are about to drop the `ability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pokedexuserball` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pokemontoability` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attack` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseExperience` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crie` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `defense` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hp` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageShiny` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speed` to the `IPokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idPokemon` to the `Pokedex` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Pokedex` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pokedexuserball` DROP FOREIGN KEY `PokedexUserBall_pokedexId_fkey`;

-- DropForeignKey
ALTER TABLE `pokedexuserball` DROP FOREIGN KEY `PokedexUserBall_userId_fkey`;

-- DropForeignKey
ALTER TABLE `pokemontoability` DROP FOREIGN KEY `PokemonToAbility_idAbility_fkey`;

-- DropForeignKey
ALTER TABLE `pokemontoability` DROP FOREIGN KEY `PokemonToAbility_idPokemon_fkey`;

-- AlterTable
ALTER TABLE `ipokemon` ADD COLUMN `attack` INTEGER NOT NULL,
    ADD COLUMN `baseExperience` INTEGER NOT NULL,
    ADD COLUMN `crie` VARCHAR(191) NOT NULL,
    ADD COLUMN `defense` INTEGER NOT NULL,
    ADD COLUMN `hp` INTEGER NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageShiny` VARCHAR(191) NOT NULL,
    ADD COLUMN `speed` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pokedex` DROP COLUMN `capture_percentual`,
    DROP COLUMN `name`,
    DROP COLUMN `quantityToPlayer`,
    ADD COLUMN `idPokemon` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `ability`;

-- DropTable
DROP TABLE `pokedexuserball`;

-- DropTable
DROP TABLE `pokemontoability`;

-- CreateTable
CREATE TABLE `PokeBall` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `capture_percentual` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPokeball` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `pokeballId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pokedex` ADD CONSTRAINT `Pokedex_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `IUSer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pokedex` ADD CONSTRAINT `Pokedex_idPokemon_fkey` FOREIGN KEY (`idPokemon`) REFERENCES `IPokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPokeball` ADD CONSTRAINT `UserPokeball_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `IUSer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPokeball` ADD CONSTRAINT `UserPokeball_pokeballId_fkey` FOREIGN KEY (`pokeballId`) REFERENCES `PokeBall`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
