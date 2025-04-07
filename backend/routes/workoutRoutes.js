const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/userController');

const {
    createWorkoutController,
    getWorkoutController,
    getAllWorkoutsController,
    updateWorkoutController,
    deleteWorkoutController,
} = require('../controllers/workoutController');

/*
    All these routes require authentication from the user, as they perform database operations based on the user
*/
router.post('/workout', authenticateToken, createWorkoutController);
router.get('/workout/:id', authenticateToken, getWorkoutController);
router.get('/workout', authenticateToken, getAllWorkoutsController);
router.patch('/workout/:id', authenticateToken, updateWorkoutController);
router.delete('/workout/:id', authenticateToken, deleteWorkoutController);

module.exports = router;    