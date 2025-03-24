const Category = require("../models/model.category");

exports.getAllCategory = async (req, res, next) => {
    try {
        const data = await Category.findAllcategories();
        const  categories = {};
        data.forEach(row => {
            
            if(!categories[row.parent_id]) {
                categories[row.parent_id] = {
                    id: row.parent_id,
                    name: row.parent_name,
                    slug: row.parent_slug,
                    subCategories:[]
                };
            }
            if(row.child_id) {
                categories[row.parent_id].subCategories.push({
                    id: row.child_id,
                    name: row.child_name,
                    slug: row.child_slug
                })
            }
        })
        res.status(200).json(Object.values(categories));
        next();
    } catch (err) {
        res.status(404).json({
            error: err.message
        }) 
        next();
    }
}