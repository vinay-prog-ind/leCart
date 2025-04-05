const express = require("express");
const { getAllProducts, createProduct, getProductDetail, getProductByCategory, buyProduct } = require("../controllers/controller.product");
const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/new").post(createProduct);
router.route("/:id").get(getProductDetail);
router.route("/").get(getProductByCategory);
router.route("/buy").post(buyProduct);
module.exports = router;