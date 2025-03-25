const express = require('express');
const router = express.Router();

const {
    createWorkoutController,
    getWorkoutController,
    getAllWorkoutsController,
} = require('../controllers/workoutController');

router.post('/workout', createWorkoutController);
router.get('/getworkout', getWorkoutController);
router.get('/workout', getAllWorkoutsController);

module.exports = router;    