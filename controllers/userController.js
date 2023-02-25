const User = require('../models/user')
const Cat = require('../models/cat')
const FavoriteCat = require('../models/favoriteCat')

exports.favoriteCats = async(req, res) => {
    try {
        let favoriteCats = await FavoriteCat.find({ user: req.session.user.id }).populate('cat').exec()
        favoriteCats = favoriteCats.map(favoriteCat=>{
            favoriteCat.cat.isFavorite = true
            return favoriteCat.cat
        })
        res.render('user/favorite_cats', { favoriteCats: favoriteCats })
    } catch (error) {
        console.log(error)
        res.redirect('/cats')
    }
}

exports.addCatToFavorites = async(req, res) => {
    try {
        const cat = await Cat.findById(req.params.id)
        const user = await User.findById(req.session.user.id)
        const favoriteCat = new FavoriteCat({
            cat: cat,
            user: user
        })
        await favoriteCat.save()        
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}

exports.removeCatFromFavorites = async(req, res) => {
    try {
        const favoriteCat = await FavoriteCat.findOne({cat: req.params.id, user: req.session.user.id}).populate('cat').exec()
        if (favoriteCat == null) return res.sendStatus(404)
        await favoriteCat.remove()
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
}
