const db = require("../models/workoutModel");

/*
    Create a workout based on the name, description, and duration of workout.
    Verify user_id and name are passed, then perform database operation.
*/
const createWorkoutController = async (req, res) => {
    try {
        const { user_id, name, description, duration } = req.body;

        if (!user_id || !name) {
            return res.status(400).send("Missing required fields: id, name");
        }

        const result = await db.createWorkout(user_id, name, description || null, duration || null);
        res.status(201).json({
            message: "Workout created successfully",
            workout: result
        });
    } catch (error) {
        console.error("Error creating workout: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Get a specific workout from a user.
    Verify the user_id and workout_id (id from req.params) match up correctly in the database, then perform database operation.
*/
const getWorkoutController = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        if (!user_id || !id) {
            return res.status(400).send("Missing required fields: user_id, workout_id");
        }

        const result = await db.getWorkout(user_id, id);
        res.status(200).json({
            message: "Specified workout returned successfully",
            result: result
        });
    } catch (error) {
        console.error("Error returning workout: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Get all workouts from a user.
    Verify the user_id in the database, then perform database operation.
*/
const getAllWorkoutsController = async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) {
            return res.status(400).send("Missing required fields: user_id");
        }

        const result = await db.getAllWorkouts(user_id);
        res.status(200).json({
            message: "All workouts from specified user returned successfully",
            result: result
        });
    } catch (error) {
        console.error("Error retrieving all workouts: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Update a specific workout from a user.
    Verify the workout_id (id from req.params) in the database, then perform database operation.
    As seen in workoutModel with COALESCE, if only one field is changed, it will keep the previous values of other fields.
*/
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

        res.status(200).json({
            message: "Workout updated successfully",
            result: result
        });
    } catch (error) {
        console.error("Error updating workout: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
    Delete a specific workout.
    Verify the workout_id (id from req.params) in the database, then perform database operation.
*/
const deleteWorkoutController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send("Missing workout ID");
        }

        const result = await db.deleteWorkout(id);

        res.status(200).json({
            message: "Workout deleted successfully",
            result: result
        });
    } catch (error) {
        console.error("Error deleting workout: ", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createWorkoutController,
    getWorkoutController,
    getAllWorkoutsController,
    updateWorkoutController,
    deleteWorkoutController,
}