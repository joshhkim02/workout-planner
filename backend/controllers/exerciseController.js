const db = require("../models/exerciseModel");

const createExerciseController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { workout_id, name, description, sets, reps, weight } = req.body;

        if (!workout_id || !name || !description || !sets || !reps || !weight) {
            return res.status(400).send("Missing required fields: workout_id, name, description, sets, reps, weight");
        }

        const result = await db.createExercise(workout_id, name, description, sets, reps, weight);
        console.log("Exercise created: ", result);
        res.status(201).json({
            message: "Exercise created successfully",
            result: result
        });
    } catch (err) {
        console.log("Error creating exercise: ", err);
        res.status(500).send("Error creating exercise: " + err.message);
    }
};

const getExerciseController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { workout_id, exercise_id } = req.body;

        if (!workout_id || !exercise_id) {
            return res.status(400).send("Missing required fields: workout_id, exercise_id");
        }

        const result = await db.getExercise(workout_id, exercise_id);
        console.log("Exercise returned: ", result);
        res.status(201).json({
            message: "Exercise returned successfully:",
            result: result
        });
    } catch (err) {
        console.log("Error returning exercise: ", err);
        res.status(500).send("Error returning exercise: " + err.message);
    }
};

const getAllExercisesController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { workout_id } = req.body;

        if (!workout_id) {
            return res.status(400).send("Missing required fields: workout_id");
        }

        const result = await db.getAllExercises(workout_id);
        console.log("All exercises from specified workout retrieved ", result);
        res.status(201).json({
            message: "All exercises from specified user workout successfully",
            result: result
        });
    } catch (err) {
        console.log("Error retrieving all exercises from specified workout: ", err);
        res.status(500).send("Error returning exercises from specified workout: " + err.message);
    }
};

module.exports = {
    createExerciseController,
    getExerciseController,
    getAllExercisesController,
}