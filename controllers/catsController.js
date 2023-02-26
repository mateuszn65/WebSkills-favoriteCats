const Cat = require("../models/cat")
const FavoriteCat = require("../models/favoriteCat")

exports.addFavoriteFlagToCats = async(req, cats) => {
    if (req.session?.user?.isLoggedIn === true) {
        const favoriteCats = await FavoriteCat.find({ user: req.session.user.id }).populate('cat').exec()
        const favoriteCatsIds = favoriteCats.map(favoriteCat => favoriteCat.cat.id)
        cats.forEach(cat => {
            if (favoriteCatsIds.includes(cat.id)) {
                cat.isFavorite = true
            }
        })
    }

}

exports.cats = async(req, res) => {
    try {
        const cats = await Cat.find({})
        await this.addFavoriteFlagToCats(req, cats)
        res.render('cats/index', { cats: cats })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.newCat = (req, res) => {
    res.render('cats/new', { cat: new Cat() })
}

exports.addNewCat = async(req, res) => {
    const cat = new Cat({
        imageTitle: req.body.imageTitle,
        imageUrl: req.body.imageUrl,
        breed: req.body.breed,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription
    })
    try {
        await cat.save()
        res.redirect(`/cats/${cat.id}`)
    } catch (error) {
        res.render('cats/new', {
            cat: cat,
            errorMessage: 'Error Creating Cat'
        })
    }
}

exports.editCat = async(req, res) => {
    try {
        const cat = await Cat.findById(req.params.id)
        res.render('cats/edit', { cat: cat })
    } catch (error) {
        res.redirect('/cats')
    }
}

exports.updateCat = async(req, res) => {
    let cat
    try {
        cat = await Cat.findById(req.params.id)
        cat.imageTitle = req.body.imageTitle
        cat.imageUrl = req.body.imageUrl
        cat.breed = req.body.breed
        cat.shortDescription = req.body.shortDescription
        cat.longDescription = req.body.longDescription
        await cat.save()
        res.redirect(`/cats/${cat.id}`)
    } catch (error) {
        if (cat == null) {
            res.redirect('/')
        } else {
            res.render('cats/edit', {
                cat: cat,
                errorMessage: 'Error Updating Cat'
            })
        }
    }
}

exports.deleteCat = async(req, res) => {
    let cat
    try {
        cat = await Cat.findById(req.params.id)
        await cat.remove()
        res.redirect('/cats')
    } catch (error) {
        if (cat == null) {
            res.redirect('/')
        } else {
            res.redirect(`/cats/${cat.id}`)
        }
    }
}

exports.catDetails = async(req, res) => {
    try {
        const cat = await Cat.findById(req.params.id)
        res.render('cats/show', { cat: cat })
    } catch (error) {
        res.redirect('/cats')
    }
}
