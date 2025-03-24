const pool = require("../database/database");

/*
    This file contains all the queries that will be used in workoutController
        - createWorkout
        - getWorkout
        - getAllWorkouts
        - updateWorkout
        - deleteWorkout
*/

async function createWorkout(user_id, name, description, duration) {
    const { rows } = await pool.query(
        "INSERT INTO workouts (user_id, name, description, duration) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, name, description, duration]
    );
    return rows[0];
}

module.exports = {
    createWorkout,
}