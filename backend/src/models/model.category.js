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
            const category = await pool.connect()
            .then( async (client) => {
                try {
                    const data = await client.query(query);
                    return data.rows;
                } catch (err) {
                    console.log(err)
                    return err;
                }    
                finally {
                    client.release();
                }
            });
            return category;
            
        } catch (err) {
            client.release();
            throw err;
        }
    }
    static async findCategory() {
        try {
            
        } catch (err) {
            client.release();
            throw err;
        }
    }
}

module.exports = Category;