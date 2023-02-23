const jwt = require('jsonwebtoken')
function isAuthenticated(req, res, next) {
    const token = req.cookies.accessToken
    if (token == null) {
        return res.redirect('/auth/login')
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            return res.redirect('/auth/login')
        }
        req.session.user = { id: user.userId, isLoggedIn: true, accessTokenExpiresAt: user.exp * 1000 }
        res.locals.user = { id: user.userId, isLoggedIn: true}
        next()
    })
}

module.exports = { isAuthenticated }