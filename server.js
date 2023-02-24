const prod = process.env.NODE_ENV === 'production'
if (!prod) {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')

const indexRouter = require('./routes/index');
const catsRouter = require('./routes/cats');
const authRouter = require('./routes/auth');
const {setUser}  = require('./middleware/sessionMiddleware');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true,
        secure: prod,
        sameSite: prod ? 'none' : 'lax',
        maxAge: parseInt(process.env.SESSION_MAX_AGE),
     },
}));
app.use(setUser);

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);
app.use('/cats', catsRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT || 3000);
