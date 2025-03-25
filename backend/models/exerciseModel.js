const pool = require("../database/database");

/*
    This file contains all the queries that will be used in exerciseController
        - createExercise
        - getExercise
        - getAllExercises
        - updateExercise
        - deleteExercise
*/

async function createExercise(workout_id, name, description, sets, reps, weight) {
    const { rows } = await pool.query(
        "INSERT INTO exercises (workout_id, name, description, sets, reps, weight) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [workout_id, name, description, sets, reps, weight]
    );
    return rows[0];
}

module.exports = {
    createExercise,
}

