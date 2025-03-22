const pool = require("./database");

/*
    This file contains all the queries that will be used in controllers
    Used in:
        - userController
        - workoutController
        - exerciseController
*/

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

module.exports = {
    getAllUsers,
}