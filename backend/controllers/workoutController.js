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
        console.log("req.body: ", req.body);
        const { user_id, workout_id } = req.body;

        if (!user_id || !workout_id) {
            return res.status(400).send("Missing required fields: user_id, workout_id");
        }

        const result = await db.getWorkout(user_id, workout_id);
        console.log("Specified workout retrieved: ", result);
        res.status(201).json({
            message: "Specified workout returned successfully",
            result: result
        });
    } catch (err) {
        console.log("Error returning workout: ", err);
        res.status(500).send("Error returning workout: " + err.message);
    }
};

module.exports = {
    createWorkoutController,
    getWorkoutController,
}