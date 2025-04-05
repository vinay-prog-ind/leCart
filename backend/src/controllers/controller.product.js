const Category = require("../models/model.category");
const Product = require("../models/model.product");


exports.getAllProducts = async (req, res, next) => {
    try {
        const data = await Product.findAllProduct();
        res.status(200).json(data);
        next();
} catch (err) {
        res.status(401).json(err);
        next();
    }
}

exports.getProductDetail = async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await Product.findProduct(id);
        res.status(200).json(data.rows);
    } catch (err) {
        res.status(401).json(err);
        next();
    }
}

exports.getProductByCategory = async (req, res, next) => {
    try {
        const id = req.query.category;
        let data;
        let test;
        if(id==="0") {
            test = "success";
            data = await Product.findAllProduct();
            
        }
        else {
            test = "fail";
            data = await Product.findProductByCategory(id);
        }
        res.status(200).json(
            {data, test}
        )
        next();
    } catch (err) {
        
    }
}


exports.createProduct = async (req, res, next) => {
    try {
        const {product_name, description, price, stock_quantity, category_id, isActive, image_uri} = req.body;

        const product_name_c = product_name.trim().replace(/<\/?[^>]+(>|$)/g, "");
        const description_c =  description.trim().replace(/<[^>]*>?/gm, "").replace(/[^\w\s.,-]/gi, "");
        image_uri_c = "https://asset.cloudinary.com/djowyils2/93bf0e6f335c09566768b1c28d447e8d";

        const data = await Product.insertProduct(product_name_c, description_c, price, stock_quantity, category_id, isActive, image_uri);
        await Category.assignCategory(data.product_id, data.category_id);
        
        res.status(200).json(data);
        // console.log(req.body);
    } catch (err) {
        console.log(err);
    }
}

exports.buyProduct = async (req, res, next) => {
    try {
        const data = req.body;
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
    }
}