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

async function getWorkout(user_id, workout_id) {
    const { rows } = await pool.query(
        "SELECT name, description, duration FROM workouts WHERE user_id = ($1) AND workout_id = ($2)",
        [user_id, workout_id]
    );
    return rows[0];
}

module.exports = {
    createWorkout,
    getWorkout,
}