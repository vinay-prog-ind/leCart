const express = require("express");
const { getAllProducts, createProduct, getProductDetail, getProductByCategory, buyProduct, uploadImage } = require("../controllers/controller.product");
const upload = require("../middleware/multer");
const router = express.Router();

router.route("/all").get(getAllProducts);
router.route("/new").post(upload.single('image'),createProduct);
router.route("/:id").get(getProductDetail);
router.route("/").get(getProductByCategory);
router.route("/buy").post(buyProduct);
router.route('/test').post(uploadImage);
module.exports = router;