const db = require("../models/workoutQueries");

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

module.exports = {
    createWorkoutController,
}