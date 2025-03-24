const pool = require("./database");

/*
    This file contains all the queries that will be used in controllers
    Used in:
        - userController
        - workoutController
        - exerciseController
*/

async function createUser(name, email, password_hash) {
    const result = await pool.query(
        "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password_hash]
    );
    return result.rows[0];
}
// TODO: Make it so it returns a specific user
async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

module.exports = {
    getAllUsers,
    createUser,
}