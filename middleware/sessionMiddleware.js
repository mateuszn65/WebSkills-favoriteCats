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

module.exports = { setUser, isLoggedIn, isNotLoggedIn }