const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const res = require('express/lib/response');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const {signAccessToken, verifyAccessToken} = require('../../utils');

class AuthService {
    static async register(data) {
        try {
            let { pseudo, mail_address, password } = data;
            console.log("1");
            password = await argon2.hash(password, {type: argon2.argon2id});
            console.log("2", data);
            const user = await prisma.user.create({
                data: {
                    pseudo: pseudo,
                    mail_address: mail_address,
                    password: password
                }
            });
            console.log("3", password);
            data.accessToken = await signAccessToken(user);
            console.log("4");
            return data;
        }
        catch (e) {
            res.json({message: e});
        }
    }
    
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

    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }
  }
  
  module.exports = AuthService;