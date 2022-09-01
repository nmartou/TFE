const auth = require('../services/auth.service');
const createError = require('http-errors');
const { signAccessToken } = require('../../utils');
const argon2 = require('argon2');
const multer = require('multer');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const upload = multer({ dest: '/frontend/src/assets/' });

const homeController = {
    // Use to create a new actuality
    createActu : async (req, res, next) => {
        try {
            const formData = req.file;
            console.log(formData, req.body);
            const { title, date, link } = req.body;
            const actu = await prisma.actuality.create({
                data: {
                    title: title,
                    image: formData.originalname,
                    date: date,
                    link: link
                }
            });
            res.json(actu);
        } catch (error) {
            next(createError(error.message));
            res.status(500).json({message: error});
        }
    },
    // Use to fetch all actualities
    getActu : async (req, res, next) => {
        try {
            const actu = await prisma.actuality.findMany();
            const actuPageData = await prisma.actual_page_data.findMany();
            res.json({actu: actu, actuHome: actuPageData});
        } catch (error) {
            next(createError(error.message));
            res.status(500).json({message: error});
        }
    },
    // Use to update the actuality's home page
    updateHomeActu : async (req, res, next) => {
        try {
            const { id_element, id_actuality } = req.body;
            console.log(id_element, id_actuality);
            const actu = await prisma.actual_page_data.update({
                where: { 
                    id_element: parseInt(id_element) 
                },
                data: { 
                    id_actuality: parseInt(id_actuality) 
                }
            });
            res.json(actu);
        } catch (error) {
            next(createError(error.message));
            res.status(500).json({message: error});
        }
    }
}

module.exports = homeController;