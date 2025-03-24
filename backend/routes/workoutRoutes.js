const express = require('express');
const router = express.Router();

const {
    createWorkoutController,
} = require('../controllers/workoutController');

router.post('/workout', createWorkoutController);

module.exports = router;    