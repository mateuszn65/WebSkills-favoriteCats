const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/sessionMiddleware');

router.get('/login', isNotLoggedIn, authController.login);
router.get('/logout', isLoggedIn, authController.logout);
router.post('/login', isNotLoggedIn, authController.login_post);
router.post('/register',isNotLoggedIn, authController.register_post);

module.exports = router;