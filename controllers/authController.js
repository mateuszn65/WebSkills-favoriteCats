
const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.login = (req, res) => {
    res.render('auth/index')
}

exports.logout = async(req, res) => {
    try {
        req.session.destroy();
        res.redirect('/auth/login')
    } catch (error) {
        res.redirect('/')
    }
}

exports.loginPost = async(req, res) => {
    try {
        const user = await validateLogin(req)
        req.session.user = { id: user.id, isLoggedIn: true, isAdmin: user.admin}
        res.redirect('/')
    } catch (error) {
        res.render('auth/index',{
            userFormData: {
                login:{
                    username: req.body.username,
                    password: req.body.password
                }   
            },
            errorMessage: error.message
        }) 
    }
}


exports.registerPost = async(req, res) => {
    try {
        await validateRegister(req)
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await user.save()
        req.session.user = { id: user.id, isLoggedIn: true}
        res.redirect('/')
    } catch (error) {
        res.render('auth/index',{
            userFormData: {
                register:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                }   
            },
            errorMessage: error.message
        })
    }
}


async function validateLogin(req){
    if (req.body.username == '' || req.body.password == '')
        throw new Error('Please fill in all login fields')

    const user = await User.findOne({username:req.body.username});
    if (user == null)
        throw new Error('Invalid credentials. No user found.')
    
    const isAuthenticated = await bcrypt.compare(req.body.password, user.password)
    if (!isAuthenticated) 
        throw new Error('Invalid credentials. Password does not match.')
    
    return user
}

async function validateRegister(req){
    if (req.body.username == '' || req.body.email == '' || req.body.password == '')
        throw new Error('Please fill in all register fields')

    if (req.body.password.length < 6)
        throw new Error('Password must be at least 6 characters')

    if(await User.exists({username: req.body.username}))
        throw new Error('Username already exists')
}
