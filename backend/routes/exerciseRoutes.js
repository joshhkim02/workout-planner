const express = require('express');
const router = express.Router();
const {
    createExerciseController,
    getExerciseController,
    getAllExercisesController,
} = require('../controllers/exerciseController');

router.post('/exercise', createExerciseController);
router.get('/exercise/:id', getExerciseController);
router.get('/exercise', getAllExercisesController);

module.exports = router;