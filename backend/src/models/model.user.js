const pool = require("../config/config.db");

class User {
    static async insertUser(user_id, username, email, password) {
        try {
            const data = pool.connect().then((client) => {
                return client
                    .query(
                        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email",
                        [ username, email, password]
                    )
                    .then((data) => {
                        client.release();
                        // console.log(data.rows[0]);
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
    static async findUserByEmail(email) {
        try {
            const data = await pool.connect().then((client) => {
                return client.query("SELECT user_id, username, email, password FROM users WHERE email = $1", [email])
                .then((data) => {
                    client.release();
                    return data.rows[0];
                })
                .catch((err) => {
                    client.release();
                    throw err;
                })
            })
            return data;
        } catch (err) {}
    }
}

module.exports = User;