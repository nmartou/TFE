const router = require("express").Router();
const QuizController = require('../controllers/QuizControllers');

router.route('/create')
    .post(QuizController.createQuiz)

router.route('/')
    .get(QuizController.getQuiz)

router.route('/all')
    .get(QuizController.getAllQuiz)

module.exports = router;