function setUser(req, res, next) {
    if (req.session?.user?.accessTokenExpiresAt > Date.now()) {
        res.locals.user = { id: req.session.user.id, isLoggedIn: req.session.user.isLoggedIn };
    } else {
        req.session.user = null;
        res.locals.user = null;
    }
    next();
}

function isLoggedIn (req, res, next) {
    if (req?.session?.user?.isLoggedIn === true){
        next();
    } else {
        res.redirect('/auth/login')
    }
}

function isNotLoggedIn (req, res, next) {
    if (req?.session?.user?.isLoggedIn === true){
        res.redirect('/')
    } else {
        next();
    }
}

module.exports = { setUser, isLoggedIn, isNotLoggedIn }