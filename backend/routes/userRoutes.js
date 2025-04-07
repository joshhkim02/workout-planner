const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
} = require('../controllers/userController');

router.post('/user', registerController);
router.post('/login', loginController);

module.exports = router;