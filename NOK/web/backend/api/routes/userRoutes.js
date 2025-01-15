const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signUp', userController.register);
router.get('/login', userController.login);

module.exports = router;
