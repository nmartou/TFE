const auth = require('../services/auth.service');
const createError = require('http-errors');
const { signAccessToken } = require('../../utils');
const argon2 = require('argon2');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authController = {
    // Use to create a new actuality
    createActu : async (req, res, next) => {
        try {
            const { title, image, date, link } = req.body;
            const actu = await prisma.actuality.create({
                data: {
                    title: title,
                    image: image,
                    date: date,
                    link: link
                }
            });
            res.json(actu);
        } catch (error) {
            next(createError(error.message));
            res.status(500).json({message: error});
        }
    }
}

module.exports = authController;