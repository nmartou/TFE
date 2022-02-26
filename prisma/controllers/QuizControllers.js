const QuizController = {
    getQuiz : async(req, res, next) => {
        res.send({message: "Get !"});
    }
}

module.exports = QuizController;