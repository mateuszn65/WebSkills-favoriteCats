const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const authController = require('../controllers/authController')

router.get('/', indexController.index);
router.get('/topCats', indexController.topCats);

module.exports = router;