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
        } catch (err) { }
    }
    static async findProduct(id) {
        try {
            const query = `SELECT * FROM products WHERE product_id = $1`;
            const data = await pool.connect().then((client) => {
                return client
                    .query(query, [id])
                    .then((data) => {
                        return data;
                    })
                    .catch((err) => console.log(err))
                    .finally(client.release);
            });
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }
    static async findProductByCategory(category_name) {
        try {
            const query = `SELECT * FROM products WHERE category_id = $1`;
            const data = await pool.connect().then((client) => {
                return client
                    .query(query, [category_name])
                    .then((data) => {
                        return data.rows;
                    })
                    .catch((err) => console.log(err))
                    .finally(client.release());
            });
            return data;
        } catch (err) { }
    }
    static async findAllProduct() {
        try {
            const query = `SELECT * FROM products`;
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
        } catch (err) { }
    }
    static async fetchProductDetails() { }

    static async updateStock() {
        try {

            // stock = stock - bought

        } catch (error) {

        }
    }
    static async insertOrder(user_id, product_id, quantity, total_cost) {

        try {
            console.log('data comming');
            const data = await pool.connect().then((client) => {
                return client
                    .query(
                        'INSERT INTO orders(user_id, total_amount, quantity, product_id) VALUES($1, $2, $3, $4) RETURNING * ',
                        [
                        user_id,
                        total_cost,
                        quantity,
                        product_id
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

}


module.exports = Product;
