const router = require("express").Router();
const QuizController = require('../controllers/QuizControllers');
const auth = require('../middlewares/auth');

router.route('/create')
    .post(auth, QuizController.createQuiz)

/*router.route('/')
    .get(QuizController.getQuiz)*/

router.route('/all')
    .get(QuizController.getAllQuiz)

router.route('/response')
    .post(auth, QuizController.createResponse)
    .put(auth, QuizController.updateResponse)

router.route('/response/:id_user/:id_quizz')
    .get(auth, QuizController.getResponse)

router.route("/delete/:id_quizz")
    .delete(auth, QuizController.deleteQuiz)

module.exports = router;