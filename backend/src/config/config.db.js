const {Pool} = require("pg");
require("dotenv").config();

const DB_URI = process.env.DB_URI;

const pool = new Pool({
    connectionString: DB_URI,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
