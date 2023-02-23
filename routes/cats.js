const express = require('express');
const router = express.Router();
const catsController = require('../controllers/catsController');
const authController = require('../controllers/authController')
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', catsController.cats)
router.get('/:id', isAuthenticated, catsController.favorite_cats)

module.exports = router;