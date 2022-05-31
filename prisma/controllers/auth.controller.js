const auth = require('../services/auth.service');
const createError = require('http-errors');
const { signAccessToken } = require('../../utils');
const argon2 = require('argon2');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authController = {
    register : async (req, res, next) => {
        try {
            //let user = await auth.register(req.body);
            let { pseudo, mail_address, password } = req.body;
            password = await argon2.hash(password, {type: argon2.argon2id});
            const user = await prisma.user.create({
                data: {
                    pseudo: pseudo,
                    mail_address: mail_address,
                    password: password
                }
            });
            const token = await signAccessToken(user);
            res.json({
                status: true,
                message: 'User created successfully',
                data: user,
                token: token
            });
        }
        catch (e) {
            next(createError(e));
            //res.json({message: e});
        }
    },
    login : async (req, res, next) => {
         try {
            const { mail_address, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    mail_address
                }
            });

            if (!user) {
                throw createError.NotFound('User not registered');
            }
            const checkPassword = await argon2.verify(user.password, password);
            if (!checkPassword) throw createError.Unauthorized('Email address or password not valid');
            delete user.password;
            const accessToken = await signAccessToken(user);

            res.status(200).json({
                user,
                accessToken
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    },
    all : async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
}
module.exports = authController;