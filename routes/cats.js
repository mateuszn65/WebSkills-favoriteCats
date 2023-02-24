const express = require('express');
const router = express.Router();
const catsController = require('../controllers/catsController');
const { isLoggedIn, isAdmin } = require('../middleware/sessionMiddleware');


router.get('/', catsController.cats)
router.get('/edit/:id', isLoggedIn, isAdmin, catsController.editCat)

router.get('/new', isLoggedIn, isAdmin, catsController.newCat)
router.post('/', isLoggedIn, isAdmin, catsController.addNewCat)
router.put('/:id', isLoggedIn, isAdmin, catsController.updateCat)
router.delete('/:id', isLoggedIn, isAdmin, catsController.deleteCat)

router.get('/:id', catsController.catDetails)
module.exports = router;