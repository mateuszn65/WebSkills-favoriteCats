
const User = require('../models/user');

exports.login = (req, res) => {
    res.render('auth/index', { user: new User()})
}

exports.logout = (req, res) => {
    res.send('logout')
}

exports.login_post = (req, res) => {
    res.send('login ' + req.body.username)
}

exports.register_post = (req, res) => {
    res.send('register ' + req.body.username)
}
