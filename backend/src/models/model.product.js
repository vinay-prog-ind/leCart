const pool = require("../config/config.db");

class Product {
    static async insertProduct(
        name,
        description,
        price,
        stock_quantity,
        category_id,
        isActive,
        image_uri
    ) {
        try {
            const data = await pool.connect().then((client) => {
                return client
                    .query(
                        `INSERT INTO products 
                    (name, description, price, stock_quantity, category_id, image_uri) 
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                        [
                            name,
                            description,
                            price,
                            stock_quantity,
                            category_id,
                            image_uri,
                        ]
                    )
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
        } catch (err) {
            console.log(err);
        }
    }
    static async editProduct() {
        try {
        } catch (err) {}
    }
    static async findProduct(id) {
        try {
            const query = `SELECT * FROM products WHERE product_id = $1`;
            const data = await pool.connect().then((client) => {
                return client.query(query, [id])
                    .then((data) => {
                        return data;
                    })
                    .catch((err) => console.log(err))
                    .finally(client.release);
            });
            return data.rows;
        } catch (err) {
            console.log(err.message);
        }
    }
    static async findProductByCategory() {
        try {
        } catch (err) {}
    }
    static async findAllProduct() {
        try {
            const query = `SELECT name, price, image_uri, category_id product_id FROM products`;
            const data = await pool.connect().then((client) => {
                return client
                    .query(query)
                    .then((data) => {
                        // client.release();
                        return data.rows;
                    })
                    .catch((err) => console.log(err.message))
                    .finally(client.release());
            });
            return data;
        } catch (err) {}
    }
    static async fetchProductDetails() {}
}

module.exports = Product;
