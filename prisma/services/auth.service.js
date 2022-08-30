const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const res = require('express/lib/response');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const {signAccessToken, verifyAccessToken} = require('../../utils');

class AuthService {
    // Use to register new user
    static async register(data) {
        try {
            let { pseudo, mail_address, password } = data;
            password = await argon2.hash(password, {type: argon2.argon2id});
            const user = await prisma.user.create({
                data: {
                    pseudo: pseudo,
                    mail_address: mail_address,
                    password: password
                }
            });
            data.accessToken = await signAccessToken(user);
            return data;
        }
        catch (e) {
            res.json({message: e});
        }
    }
    
    // Use to login user
    static async login(data) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        const checkPassword = await argon2.verify(user.password, password);
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
        delete user.password
        const accessToken = await jwt.signAccessToken(user)
        return { ...user, accessToken }
    }

    // Use to get user data
    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }
  }
  
  module.exports = AuthService;