const {Router} = require("express");
const { register, login, adminLogin } = require("../controllers/controller.user");
const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/login/admin').post(adminLogin);


module.exports = router;