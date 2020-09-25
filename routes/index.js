const express = require('express'),
    router = express.Router(),
    { ensureAuthenticated } = require('../config/auth')

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // console.log('===', req.user)
    res.render('dashboard', {
        name: req.user.name // when we're logged in we have access to the user (via passport)
    })
})

// Welcome Page
router.get('/', (req, res) => res.render('welcome'))

module.exports = router