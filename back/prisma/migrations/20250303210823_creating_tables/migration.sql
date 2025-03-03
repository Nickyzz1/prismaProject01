-- CreateTable
CREATE TABLE `Pokedex` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `capture_percentual` INTEGER NOT NULL,
    `quantityToPlayer` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokedexUserBall` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `pokedexId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonToAbility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idAbility` INTEGER NOT NULL,
    `idPokemon` INTEGER NOT NULL,
    `sprite` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IPokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_IPokemonToIUSer` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_IPokemonToIUSer_AB_unique`(`A`, `B`),
    INDEX `_IPokemonToIUSer_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PokedexUserBall` ADD CONSTRAINT `PokedexUserBall_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `IUSer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokedexUserBall` ADD CONSTRAINT `PokedexUserBall_pokedexId_fkey` FOREIGN KEY (`pokedexId`) REFERENCES `Pokedex`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonToAbility` ADD CONSTRAINT `PokemonToAbility_idAbility_fkey` FOREIGN KEY (`idAbility`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonToAbility` ADD CONSTRAINT `PokemonToAbility_idPokemon_fkey` FOREIGN KEY (`idPokemon`) REFERENCES `IPokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IPokemonToIUSer` ADD CONSTRAINT `_IPokemonToIUSer_A_fkey` FOREIGN KEY (`A`) REFERENCES `IPokemon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_IPokemonToIUSer` ADD CONSTRAINT `_IPokemonToIUSer_B_fkey` FOREIGN KEY (`B`) REFERENCES `IUSer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
