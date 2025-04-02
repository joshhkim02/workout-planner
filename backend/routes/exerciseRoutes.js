const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../controllers/userController');

const {
    createExerciseController,
    getExerciseController,
    getAllExercisesController,
    updateExerciseController,
    deleteExerciseController,
} = require('../controllers/exerciseController');

router.post('/exercise', authenticateToken, createExerciseController);
router.get('/exercise/:id', authenticateToken, getExerciseController);
router.get('/exercise', authenticateToken, getAllExercisesController);
router.patch('/exercise/:id', authenticateToken, updateExerciseController);
router.delete('/exercise/:id', authenticateToken, deleteExerciseController);

module.exports = router;