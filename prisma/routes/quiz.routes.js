const router = require("express").Router();
const QuizController = require('../controllers/QuizControllers');

router.route('/create')
    .post(QuizController.createQuiz)

router.route('/')
    .get(QuizController.getQuiz)

module.exports = router;