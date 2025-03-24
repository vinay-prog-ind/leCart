const {Router} = require("express");
const { getAllCategory} = require("../controllers/controller.category");
const router = Router();

router.route("/categories").get(getAllCategory);

module.exports = router;