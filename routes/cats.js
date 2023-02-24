const express = require('express');
const router = express.Router();
const catsController = require('../controllers/catsController');
const { isLoggedIn } = require('../middleware/sessionMiddleware');


router.get('/', catsController.cats)
router.get('/:id', isLoggedIn, catsController.favorite_cats)

module.exports = router;