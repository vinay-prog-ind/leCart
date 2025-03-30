const express = require("express");
const { getAllProducts, createProduct, getProductDetail } = require("../controllers/controller.product");
const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/new").post(createProduct);
router.route("/:id").get(getProductDetail);
module.exports = router;