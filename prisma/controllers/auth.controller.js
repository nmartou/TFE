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
            const data = await auth.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
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