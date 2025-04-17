// const { cloudinary} = require("../config/config.cloudinary");
const Category = require("../models/model.category");
const Product = require("../models/model.product");
const uploadOnCloudinary = require("../utils/config.cloudinary");
const fs = require("fs");
const path = require("path");

exports.getAllProducts = async (req, res, next) => {
    try {
        const data = await Product.findAllProduct();
        res.status(200).json(data);
        next();
    } catch (err) {
        res.status(401).json(err);
        next();
    }
};

exports.getProductDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Product.findProduct(id);
        res.status(200).json(data.rows);
    } catch (err) {
        res.status(401).json(err);
        next();
    }
};

exports.getProductByCategory = async (req, res, next) => {
    try {
        const id = req.query.category;
        let data;
        let test;
        if (id === "0") {
            test = "success";
            data = await Product.findAllProduct();
        } else {
            test = "fail";
            data = await Product.findProductByCategory(id);
        }
        res.status(200).json({ data, test });
        next();
    } catch (err) {}
};

exports.createProduct = async (req, res, next) => {
    try {
        const {
            product_name,
            description,
            price,
            stock_quantity,
            category_id,
            isActive,
        } = req.body;

        const product_name_c = product_name
            .trim()
            .replace(/<\/?[^>]+(>|$)/g, "");
        const description_c = description
            .trim()
            .replace(/<[^>]*>?/gm, "")
            .replace(/[^\w\s.,-]/gi, "");

        const productImageLocalPath = req.file?.path;
        const { url } = await uploadOnCloudinary(productImageLocalPath);
        let data;
        if (url) {
            data = await Product.insertProduct(
                product_name_c,
                description_c,
                price,
                stock_quantity,
                category_id,
                isActive,
                url
            );
        }
        console.log(req.file.path);
        if (data) {
            fs.unlink(productImageLocalPath,
                (err) => {
                    if (err) {
                        console.error("Error deleting local file:", err);
                    } else {
                        console.log("Local file deleted successfully");
                    }
                }
            );
        }
        console.log(data);
        // await Category.assignCategory(data.product_id, data.category_id);

        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
};

exports.buyProduct = async (req, res, next) => {
    try {
        const {
            product_id,
            address,
            pincode,
            email,
            mobile_no,
            quantity,
            total_cost,
            user_id,
        } = req.body;
        console.log(req.body);
        const data = await Product.insertOrder(
            user_id,
            product_id,
            quantity,
            total_cost
        );
        if (data) {
            const addressdata = await Product.insertAddress(
                data.order_id,
                email,
                mobile_no,
                address,
                pincode,
                data.user_id
            );
            console.log(addressdata);
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
};

exports.uploadImage = async (req, res, next) => {
    try {
        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "uploads" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(req.file.buffer);
            });
        };

        const result = await streamUpload();
        // res.status(200).json({ url: result.secure_url });
        console.log(result.secure_url);

        next();
    } catch (err) {
        console.log(err.message);
        next(err);
    }
};
