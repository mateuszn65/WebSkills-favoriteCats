const Cat = require('../models/cat')
const addFavoriteFlagToCats = require('./catsController').addFavoriteFlagToCats
exports.index = async(req, res) => {
    try {
        const noCats = await Cat.find({}).count().exec()
        res.render('index', { noTopCats: Math.min(noCats, 5) })
    } catch (error) {
        res.render('index', { noTopCats : 0 })
    }
}
exports.topCats = async(req, res) => {
    try {
        const topCats = await Cat.find({}).sort({ numFavorites: -1 }).limit(5).exec()
        await addFavoriteFlagToCats(req, topCats)
        res.json(topCats)
    } catch (error) {
        res.json([]).status(500)
    }
}