const db = require("../models/exerciseModel");

/*
    Create an exercise based on the name, description, sets, reps, and weight of said exercise.
    Verify all required params are passed, then perform database operation.
*/
const createExerciseController = async (req, res) => {
    try {
        const { user_id, name, description, sets, reps, weight } = req.body;

        if (!user_id || !name || !description || !sets || !reps || !weight) {
            return res.status(400).send("Missing required fields: user_id, name, description, sets, reps, weight");
        }

        const result = await db.createExercise(user_id, name, description, sets, reps, weight);
        res.status(201).json({
            message: "Exercise created successfully",
            result: result
        });
    } catch (error) {
        console.error("Error creating exercise: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Get a specific exercise from a user.
    Verify the user_id and exercise_id (id from req.params) match up correctly in the database, then perform database operation.
*/
const getExerciseController = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        if (!user_id || !id) {
            return res.status(400).send("Missing required fields: user_id, exercise_id");
        }

        const result = await db.getExercise(user_id, id);
        res.status(200).json({
            message: "Exercise returned successfully:",
            result: result
        });
    } catch (error) {
        console.error("Error returning exercise: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Get all exercises from a user.
    Verify the user_id in the database, then perform database operation.
*/
const getAllExercisesController = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) {
            return res.status(400).send("Missing required fields: user_id");
        }

        const result = await db.getAllExercises(user_id);
        res.status(200).json({
            message: "All exercises from specified user successfully",
            result: result
        });
    } catch (error) {
        console.error("Error retrieving all exercises: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Update a specific exercise from a user.
    Verify the exercise_id (id from req.params) in the database, then perform database operation.
    As seen in exerciseModel with COALESCE, if only one field is changed, it will keep the previous values of other fields.
*/
const updateExerciseController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, sets, reps, weight } = req.body;

        if (!id) {
            return res.status(400).json({
                error: "Exercise ID is required"
            });
        }

        const result = await db.updateExercise(id, name || null, description || null, sets || null, reps || null, weight || null);

        if (!result) {
            return res.status(404).json({
                error: "Exercise not found"
            });
        }

        res.status(200).json({
            message: "Exercise updated successfully",
            result: result
        });
    } catch (error) {
        console.error("Error updating exercise: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Delete a specific exercise.
    Verify the exercise_id (id from req.params) in the database, then perform database operation.
*/
const deleteExerciseController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send("Missing required field: exercise_id");
        }

        const result = await db.deleteExercise(id);
        res.status(200).json({
            message: "Exercise deleted successfully",
            result: result
        });
    } catch (error) {
        console.error("Error deleting exercise: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createExerciseController,
    getExerciseController,
    getAllExercisesController,
    updateExerciseController,
    deleteExerciseController,
}