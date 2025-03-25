const express = require('express');
const router = express.Router();

const {
    createWorkoutController,
    getWorkoutController,
} = require('../controllers/workoutController');

router.post('/workout', createWorkoutController);
router.get('/workout', getWorkoutController);

module.exports = router;    