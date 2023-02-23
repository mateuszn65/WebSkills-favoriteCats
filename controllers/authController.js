
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login = (req, res) => {
    res.render('auth/index', { user: req.user })
}

exports.logout = async(req, res) => {
    // const refreshToken = req.cookies.refreshToken;
    // if (!refreshToken) return res.status(401).send('Access Denied');

    try {
        // await RefreshToken.deleteOne({ token: refreshToken })
        res.clearCookie('accessToken');
        res.clearCookie('refreshJwt');
        req.session.destroy();
        res.redirect('/auth/login')
    } catch (error) {
        res.redirect('/')
    }
}

exports.login_post = async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username:username});

        if (user == null){
            // console.log('Cannot find user')
            return res.redirect('/auth/login')
        } 

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            // console.log('Wrong password')
            return res.redirect('/auth/login')
        }

        const accessToken = createAccessToken(user.id);

        // const refreshToken = createRefreshToken(user.id);

        // const newRefreshToken = new RefreshToken({
        //     token: refreshToken,
        //     user: user.id,
        // });
        
        // await newRefreshToken.save();

        // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
        
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
        req.session.user = { id: user.id, isLoggedIn: true, accessTokenExpiresAt: Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRATION) * 1000}
        res.redirect('/')
    } catch (err) {
        res.redirect('/auth/login')
    }
}

exports.register_post = async(req, res) => {
    
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await user.save()
        const accessToken = createAccessToken(user.id)
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' })
        
        // const refreshToken = createRefreshToken(user.id)
        // res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' })
        
        req.session.user = { id: user.id, isLoggedIn: true, accessTokenExpiresAt: Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRATION) * 1000}
        res.redirect('/')
    } catch (error) {
        console.log(error)
        res.redirect('/auth/login')
    }
}


function createAccessToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn:  process.env.ACCESS_TOKEN_EXPIRATION + 's' })
}

function createRefreshToken(userId) {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION + 's' })
}
