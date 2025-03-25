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

async function getExercise(workout_id, exercise_id) {
    const { rows } = await pool.query(
        "SELECT name, description, sets, reps, weight FROM exercises WHERE workout_id = ($1) AND exercise_id = ($2)",
        [workout_id, exercise_id]
    );
    return rows[0];
}

// exercise_id, name, description, sets, reps, weight
async function getAllExercises(workout_id) {
    const { rows } = await pool.query(
        "SELECT * FROM exercises WHERE workout_id = ($1)",
        [workout_id]
    );
    return rows;
}

async function updateExercise(exercise_id, name, description, sets, reps, weight) {
    const { rows } = await pool.query(
        "UPDATE exercises SET name = COALESCE($1, name), description = COALESCE($2, description), sets = COALESCE($3, sets), reps = COALESCE($4, reps), weight = COALESCE($5, weight) WHERE exercise_id = ($6) RETURNING *",
        [name, description, sets, reps, weight, exercise_id]
    );
    return rows[0]
}

async function deleteExercise(exercise_id) {
    const { rows } = await pool.query("DELETE FROM exercises WHERE exercise_id = ($1) RETURNING *", [exercise_id]);
    return rows[0];
}

module.exports = {
    createExercise,
    getExercise,
    getAllExercises,
    updateExercise,
    deleteExercise,
}

