const pool = require("../database/database");

/*
    This file contains all the queries that will be used in userController
        - createUser(name, email, password_hash)
        - getUser(user_email)
*/

async function createUser(name, email, password_hash) {
    const result = await pool.query(
        "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password_hash]
    );
    return result.rows[0];
}

async function getUser(user_email) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = ($1)", [user_email]);
    return rows[0];
}

module.exports = {
    createUser,
    getUser,
}