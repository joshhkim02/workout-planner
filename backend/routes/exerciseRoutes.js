const express = require('express');
const router = express.Router();
const {
    createExerciseController,
    getExerciseController,
    getAllExercisesController,
    updateExerciseController,
} = require('../controllers/exerciseController');

router.post('/exercise', createExerciseController);
router.get('/exercise/:id', getExerciseController);
router.get('/exercise', getAllExercisesController);
router.patch('/exercise/:id', updateExerciseController);

module.exports = router;