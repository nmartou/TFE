const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const {signAccessToken, verifyAccessToken} = require('../../utils');

class AuthService {
    static async register(data) {
        data.password = argon2.hash(data.password, {type: argon2.argon2id});
        let user = prisma.user.create({
            data
        });
        console.log("3", data);
        data.accessToken = await signAccessToken(user);
        console.log("4");
        return data;
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