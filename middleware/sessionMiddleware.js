const User = require('../models/user')
function setUser(req, res, next) {
    res.locals.user = req.session.user || null;
    next();
}

function isLoggedIn (req, res, next) {
    if (req.session?.user?.isLoggedIn === true){
        next();
    } else {
        res.redirect('/auth/login')
    }
}

function isNotLoggedIn (req, res, next) {
    if (req.session?.user?.isLoggedIn === true){
        res.redirect('/')
    } else {
        next();
    }
}

async function isAdmin(req, res, next) {
    if (req.session?.user?.isAdmin === true){
        next();
    } else {
        res.redirect('/')
    }
}

module.exports = { setUser, isLoggedIn, isNotLoggedIn, isAdmin }