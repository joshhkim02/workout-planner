const express = require('express');
const router = express.Router();
const {
  registerController,
  // loginController,
  // logoutController,
  getAllUsersController,
  getUserController,
} = require('../controllers/userController');

router.post('/register', registerController);
// router.post('/login', loginController);
// router.post('/logout', logoutController);
router.get('/user', getAllUsersController);
router.get('/getuser', getUserController);

module.exports = router;