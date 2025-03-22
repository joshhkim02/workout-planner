require('dotenv').config({ path: '../.env' })
const { Pool } = require("pg");

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "workout_planner",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});