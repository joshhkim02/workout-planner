const express = require('express');
const router = express.Router();
const {
  // registerController,
  // loginController,
  // logoutController,
  getUserController,
} = require('../controllers/userController');

// router.post('/register', registerController);
// router.post('/login', loginController);
// router.post('/logout', logoutController);
router.get('/user', getUserController);

module.exports = router;