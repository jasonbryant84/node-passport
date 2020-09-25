const express = require('express'),
    app = express(),
    PORT = process.env.PORT || 5000,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport')


// Passport config (set it up)
require('./config/passport')(passport) // pass in passport as param

// MongoDB Config
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> {
        console.log('MongoDB Connected...')
    })
    .catch((error)=> {
        console.log(error)
    })

// EJS (middleware)
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express Session (for transition between redirects)
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware (1:11:29) location of this is important
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./routes/index'))

// Users/Login & Users/Register
app.use('/users', require('./routes/users'))

// Listen
app.listen(PORT, console.log(`Server started port on ${PORT}`))