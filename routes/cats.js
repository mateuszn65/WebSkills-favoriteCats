const express = require('express');
const router = express.Router();
const catsController = require('../controllers/catsController');

router.get('/', catsController.cats)
router.get('/:id', catsController.favorite_cats)

module.exports = router;