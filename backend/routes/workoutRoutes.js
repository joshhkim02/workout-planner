const express = require('express');
const router = express.Router();

const {
    createWorkoutController,
    getWorkoutController,
    getAllWorkoutsController,
    updateWorkoutController,
} = require('../controllers/workoutController');

router.post('/workout', createWorkoutController);
router.get('/getworkout', getWorkoutController);
router.get('/workout', getAllWorkoutsController);
router.patch('/workout/:id', updateWorkoutController);

module.exports = router;    