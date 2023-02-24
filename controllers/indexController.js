const Cat = require('../models/cat')
const addFavoriteFlagToCats = require('./catsController').addFavoriteFlagToCats
exports.index = async(req, res) => {
    try {
        const topCats = await Cat.find({}).sort({ numFavorites: -1 }).limit(5).exec()
        await addFavoriteFlagToCats(req, topCats)
        res.render('index', { topCats: topCats })
    } catch (error) {
        res.render('index', { topCats : [] })
    }
}