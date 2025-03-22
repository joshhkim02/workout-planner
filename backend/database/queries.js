const pool = require("./database");

async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

module.exports = {
    getAllUsers,
}