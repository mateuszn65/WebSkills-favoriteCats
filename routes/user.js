const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/favoriteCats', userController.favoriteCats);
router.post('/favoriteCats/:id', userController.addCatToFavorites);
router.delete('/favoriteCats/:id', userController.removeCatFromFavorites);

module.exports = router;
