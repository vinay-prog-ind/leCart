const express = require("express");
const { getAllProducts, createProduct } = require("../controllers/controller.product");
const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/new").post(createProduct);

module.exports = router;