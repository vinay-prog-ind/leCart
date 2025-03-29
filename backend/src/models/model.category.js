const pool = require("../config/config.db");

class Category {
    static async findAllcategories() {
        try {
            const query = `SELECT 
                parent.category_id AS parent_id,
                parent.name AS parent_name,
                parent.slug AS parent_slug,
                child.category_id AS child_id,
                child.name AS child_name,
                child.slug AS child_slug
                FROM 
                categories parent
                LEFT JOIN 
                categories child ON child.parent_id = parent.category_id
                WHERE 
                parent.parent_id IS NULL
                ORDER BY 
                parent.name, child.name`;
            const category = await pool.connect().then(async (client) => {
                try {
                    const data = await client.query(query);
                    console.log(data.rows);
                    return data.rows;
                } catch (err) {
                    console.log(err);
                    return err;
                } finally {
                    client.release();
                }
            });
            return category;
        } catch (err) {
            client.release();
            throw err;
        }
    }
    static async assignCategory(product_id, category_id) {
        try {
            const query = `
            INSERT INTO product_category (product_id, category_id)
            VALUES ($1, $2) RETURNING * 
        `;
            const data = await pool.connect().then((client) => {
                client
                    .query(query, [product_id, category_id])
                    .then((data) => {
                        client.release();
                        return data.rows[0];
                    })
                    .catch((err) => {
                        client.release();
                        throw err;
                    });
            });
            return data;
        } catch (err) {}
    }
    static async findCategory() {
        try {
        } catch (err) {
            client.release();
            throw err;
        }
    }
    static async findByCategoryName(categoryName) {
        try {
            // const query = `SELECT `
            const data = await pool.connect().then((client) => {
                client.query()
            })
        } catch (err) {
            
        }
    }
}


module.exports = Category;
