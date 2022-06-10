const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const QuizController = {
    createQuiz : async(req, res, next) => {
        try {
            const { title, limitTime, content } = req.body;
            const quiz = await prisma.quizz.create({
                data: {
                    title: title,
                    limit_time: limitTime,
                    content: JSON.stringify(content)
                }
            });
            res.json(quiz);
        } catch (error) {
            res.status(500).json({message: error});
        }
    },
    getQuiz : async(req, res, next) => {
        res.send({message: "Get Quiz !"});
    },
    getAllQuiz : async(req, res, next) => {
        try {
            const quizz = await prisma.quizz.findMany();
            res.json(quizz);
        } catch (error) {
            res.json({message: error});
        }
    }
}

module.exports = QuizController;