const router = require("express").Router();
const QuizController = require('../controllers/QuizControllers');
const auth = require('../middlewares/auth');

router.route('/create')
    .post(auth, QuizController.createQuiz)

router.route('/')
    .get(QuizController.getQuiz)

router.route('/all')
    .get(QuizController.getAllQuiz)

module.exports = router;