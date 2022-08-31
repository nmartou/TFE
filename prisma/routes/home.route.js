const router = require("express").Router();
const home = require("../controllers/home.controller");
const auth = require('../middlewares/auth');

router.route("/actu")
    .post(auth, home.createActu)

module.exports = router;