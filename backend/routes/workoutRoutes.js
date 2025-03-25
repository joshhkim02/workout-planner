const express = require('express');
const router = express.Router();

const {
    createWorkoutController,
    getWorkoutController,
    getAllWorkoutsController,
    updateWorkoutController,
    deleteWorkoutController,
} = require('../controllers/workoutController');

router.post('/workout', createWorkoutController);
router.get('/getworkout', getWorkoutController);
router.get('/workout', getAllWorkoutsController);
router.patch('/workout/:id', updateWorkoutController);
router.delete('/workout/:id', deleteWorkoutController);

module.exports = router;    