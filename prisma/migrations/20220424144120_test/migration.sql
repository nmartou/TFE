-- CreateTable
CREATE TABLE `quizz` (
    `id_quizz` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `limit_time` TIME(0) NULL,
    `content` MEDIUMTEXT NULL,

    PRIMARY KEY (`id_quizz`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `score_game` (
    `id_score` INTEGER NOT NULL AUTO_INCREMENT,
    `game_name` VARCHAR(50) NOT NULL,
    `best_score` FLOAT NOT NULL,

    PRIMARY KEY (`id_score`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `score_quizz` (
    `id_score_quizz` INTEGER NOT NULL AUTO_INCREMENT,
    `id_quizz` INTEGER NOT NULL,
    `best_score` FLOAT NOT NULL,

    INDEX `id_quizz`(`id_quizz`),
    PRIMARY KEY (`id_score_quizz`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` VARCHAR(191) NOT NULL,
    `pseudo` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `mail_address` VARCHAR(100) NOT NULL,
    `status` VARCHAR(10) NULL DEFAULT 'user',
    `id_score` INTEGER NULL,
    `id_score_quizz` INTEGER NULL,
    `is_verified` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `user_id_user_key`(`id_user`),
    UNIQUE INDEX `pseudo`(`pseudo`),
    UNIQUE INDEX `mail_address`(`mail_address`),
    INDEX `id_score`(`id_score`),
    INDEX `id_score_quizz`(`id_score_quizz`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `hashedToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `refreshToken_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `score_quizz` ADD CONSTRAINT `score_quizz_ibfk_1` FOREIGN KEY (`id_quizz`) REFERENCES `quizz`(`id_quizz`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_score`) REFERENCES `score_game`(`id_score`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`id_score_quizz`) REFERENCES `score_quizz`(`id_score_quizz`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `refreshToken` ADD CONSTRAINT `refreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
