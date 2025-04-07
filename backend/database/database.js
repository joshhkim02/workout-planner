require('dotenv').config({ path: '../.env' })
const { Pool } = require("pg");

/*
    Hiding sensitive information like password and port using dotenv
    Using pool allows us to have a "pool" of clients, holding onto connections
    This opens a new connection unless there's an existing spare one
*/

module.exports = new Pool({
    host: "localhost",
    user: "postgres",
    database: "workout_planner",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});