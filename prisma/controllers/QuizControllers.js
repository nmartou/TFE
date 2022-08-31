const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const QuizController = {
    // Use to create a new quiz
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
            next(createError(error.message));
            res.status(500).json({message: error});
        }
    },
    /* Request to test the backend
    getQuiz : async(req, res, next) => {
        res.send({message: "Get Quiz !"});
    },*/
    // Use to get all quizzes
    getAllQuiz : async(req, res, next) => {
        try {
            const quizz = await prisma.quizz.findMany();
            console.log(quizz)
            res.json(quizz);
        } catch (error) {
            console.log(error);
            next(createError(error.message));
            res.json({message: error});
        }
    },
    // Use to create a response for a quiz
    createResponse : async(req, res, next) => {
        try {
            const { best_score, id_user, id_quizz, max_score } = req.body;
            const score = await prisma.score_quizz.create({
                data: {
                    best_score: parseFloat(best_score),
                    id_user: parseInt(id_user),
                    id_quizz: parseInt(id_quizz),
                    max_score: parseFloat(max_score)
                }
            });
            res.status(200).json({message: "Score enregistré !", score});
            
        } catch (error) {
            next(createError(error.message));
            res.status(404).json({message: error});
        }
    },
    // Use to get response for a quiz from a user id
    getResponse : async(req, res, next) => {
        try {
            const { id_user, id_quizz } = req.params;
            const score = await prisma.score_quizz.findFirst({
                where: {
                    id_quizz: parseInt(id_quizz),
                    id_user: parseInt(id_user)
                }
            });
            res.status(200).json({message: "Score récupéré !", get: score});
        } catch (error) {
            next(createError(error.message));
            res.status(404).json({message: error});
        }
    },
    // Use to update a response for a quiz
    updateResponse : async(req, res, next) => {
        try {
            const { best_score, id_user, id_quizz, max_score } = req.body;
            const findMyScore = await prisma.score_quizz.findFirst({
                where: {
                    id_quizz: id_quizz,
                    id_user: id_user
                }
            });
            if(findMyScore && findMyScore.best_score < best_score) {
                console.log("3");
                const updateScore = await prisma.score_quizz.updateMany({
                    where: {
                        id_quizz: parseInt(id_quizz),
                        id_user: parseInt(id_user)
                    },
                    data: {
                        best_score: parseFloat(best_score),
                        max_score: parseFloat(max_score)
                    }
                });
                res.status(200).json({message: "Score modifié !", updateScore});
            }
            else {
                res.status(200).json({message: "Score égal ou plus petit que votre meilleur score !"});
            }
            
        } catch (error) {
            next(error.message);
            res.status(404).json({message: error.message});
        }
    },
    // Use to update or create a response for a quiz
    updateOrCreateResponse : async(req, res, next) => {
        try {
            const { best_score, id_user, id_quizz, max_score } = req.body;
            const findMyScore = await prisma.score_quizz.findFirst({
                where: {
                    id_quizz: id_quizz,
                    id_user: id_user
                }
            });
            if(findMyScore && findMyScore.best_score >= best_score) {
                res.status(200).json({message: "Score égal ou plus petit que votre meilleur score !"});
                return next();
            }
            const insertScore = await prisma.score_quizz.upsert({
                where: {
                    id_user: id_user,
                    id_quizz: id_quizz
                },
                update: {
                    best_score: best_score,
                    max_score: max_score
                },
                create: {
                    best_score: best_score,
                    max_score: max_score,
                    id_user: id_user,
                    id_quizz: id_quizz
                },
            });
            res.status(200).json({message: "Score enregistré !", insertScore});
        } catch (error) {
            next(error.message);
            console.log(error.message);
            //res.status(404).json({message: error.message});
        }
    },
    // Use to delete a quiz
    deleteQuiz : async(req, res, next) => {
        try {
            const { id_quizz } = req.params;
            const deleteQuiz = await prisma.quizz.delete({
                where: {
                    id_quizz: parseInt(id_quizz)
                }
            });
            res.status(200).json({message: "Quiz supprimé !", deleteQuiz});
        } catch (error) {
            next(error.message);
            res.status(404).json({message: error.message});
        }
    }
}

module.exports = QuizController;