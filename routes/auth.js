const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/login', authController.login_post);
router.post('/register', authController.register_post);

module.exports = router;