const pool = require("../database/database");

/*
    This file contains all the queries that will be used in exerciseController
        - createExercise
        - getExercise
        - getAllExercises
        - updateExercise
        - deleteExercise
*/

async function createExercise(user_id, name, description, sets, reps, weight) {
    const { rows } = await pool.query(
        "INSERT INTO exercises (user_id, name, description, sets, reps, weight) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [user_id, name, description, sets, reps, weight]
    );
    return rows[0];
}

async function getExercise(user_id, exercise_id) {
    const { rows } = await pool.query(
        "SELECT name, description, sets, reps, weight FROM exercises WHERE user_id = ($1) AND exercise_id = ($2)",
        [user_id, exercise_id]
    );
    return rows[0];
}

async function getAllExercises(user_id) {
    const { rows } = await pool.query(
        "SELECT * FROM exercises WHERE user_id = ($1)",
        [user_id]
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

