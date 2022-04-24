const auth = require('../services/auth.service');
const createError = require('http-errors');

const authController = {
    register : async (req, res, next) => {
        try {
            console.log("0");
            const user = await auth.register(req.body);
            console.log("0.5", user);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
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