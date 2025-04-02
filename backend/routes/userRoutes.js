const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
  getAllUsersController,
  getUserController,
  deleteUserController,
  authenticateToken,
} = require('../controllers/userController');

router.post('/user', registerController);
router.post('/login', loginController);
router.delete('/user', authenticateToken, deleteUserController);
router.get('/user', authenticateToken, getAllUsersController);
router.get('/user/:id', authenticateToken, getUserController);


module.exports = router;