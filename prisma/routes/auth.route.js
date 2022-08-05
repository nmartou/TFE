const router = require("express").Router();
const user = require("../controllers/auth.controller");
const auth = require('../middlewares/auth');

router.route("/")
    .post(user.register)

router.route("/login")
    .post(user.login)

router.route("/")
    .get(auth, user.all)

router.route("/delete/:id")
    .delete(auth, user.delete)

module.exports = router;