const router = require("express").Router();
const home = require("../controllers/home.controller");
const auth = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/src/assets/home');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.route("/actu")
    .post(auth, upload.single("image"), home.createActu)
    .get(home.getActu);

router.route("/")
    .put(auth, home.updateHomeActu)

module.exports = router;