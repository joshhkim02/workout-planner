const express = require('express');
const router = express.Router();
const {
    createExerciseController,
} = require('../controllers/exerciseController');

router.post('/exercise', createExerciseController);

module.exports = router;