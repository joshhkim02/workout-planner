const db = require("../models/workoutModel");

const createWorkoutController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { user_id, name, description, duration } = req.body;

        if (!user_id || !name) {
            return res.status(400).send("Missing required fields: id, name");
        }

        const result = await db.createWorkout(user_id, name, description || null, duration || null);
        console.log("Workout created: ", result);
        res.status(201).json({
            message: "Workout created successfully",
            workout: result
        });
    } catch (err) {
        console.log("Error creating workout: ", err);
        res.status(500).send("Error creating workout: " + err.message);
    }
};

const getWorkoutController = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, workout_id } = req.user.id;

        if (!user_id || !id) {
            return res.status(400).send("Missing required fields: user_id, workout_id");
        }

        const result = await db.getWorkout(user_id, id);
        console.log("Specified workout retrieved: ", result);
        res.status(200).json({
            message: "Specified workout returned successfully",
            result: result
        });
    } catch (err) {
        console.log("Error returning workout: ", err);
        res.status(500).send("Error returning workout: " + err.message);
    }
};

const getAllWorkoutsController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const user_id = req.user.id;

        if (!user_id) {
            return res.status(400).send("Missing required fields: user_id");
        }

        const result = await db.getAllWorkouts(user_id);
        console.log("All workouts from specified user retrieved ", result);
        res.status(200).json({
            message: "All workouts from specified user returned successfully",
            result: result
        });
    } catch (err) {
        console.log("Error retrieving all workouts: ", err);
        res.status(500).send("Error returning workouts: " + err.message);
    }
};

const updateWorkoutController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, duration } = req.body;

        if (!id) {
            return res.status(400).json({
                error: "Workout ID is required"
            });
        }

        const result = await db.updateWorkout(id, name || null, description || null, duration || null);

        if (!result) {
            return res.status(404).json({
                error: "Workout not found"
            });
        }

        res.status(201).json({
            message: "Workout updated successfully",
            result: result
        });
    } catch (err) {
        console.log("Error updating workout: ", err);
        res.status(500).send("Error updating workout: " + err.message);
    }
};

const deleteWorkoutController = async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        const { workout_id } = req.body;

        if (!workout_id) {
            return res.status(400).send("Missing required field: workout_id");
        }

        const result = await db.deleteWorkout(workout_id);
        console.log("Workout deleted: ", result);
        res.status(201).json({
            message: "Workout deleted successfully",
            result: result
        });
    } catch (err) {
        console.log("Error deleting workout: ", err);
        res.status(500).send("Error deleting workout: " + err.message);
    }
};

module.exports = {
    createWorkoutController,
    getWorkoutController,
    getAllWorkoutsController,
    updateWorkoutController,
    deleteWorkoutController,
}