const express = require('express');
const router = express.Router();
const {
    createExerciseController,
    getExerciseController,
} = require('../controllers/exerciseController');

router.post('/exercise', createExerciseController);
router.get('/exercise/:id', getExerciseController)

module.exports = router;