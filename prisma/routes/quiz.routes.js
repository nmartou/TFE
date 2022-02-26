const router = require("express").Router();
const quizController = require('../controllers/QuizControllers');

router.route('/create')
    .get(quizController.getQuiz)

router.get('/', async(req, res, next) => {
    res.send({ message: 'Ok api is working on "/"'});
})

module.exports = router;