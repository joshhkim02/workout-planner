const express = require('express');
const router = express.Router();
const {
  registerController,
  // loginController,
  // logoutController,
  getAllUsersController,
  getUserController,
  deleteUserController,
} = require('../controllers/userController');

router.post('/user', registerController);
router.delete('/user', deleteUserController);
router.get('/user', getAllUsersController);
router.get('/getuser', getUserController);

// router.post('/login', loginController);
// router.post('/logout', logoutController);

module.exports = router;