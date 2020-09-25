module.exports = {
    ensureAuthenticated: (req, res, next) => {
        // If authenticated keep going as expected
        if(req.isAuthenticated()) {
            return next()
        }

        // Otherwise redirect user to login page with error message
        req.flash('error_msg', 'Please log in to view this resource')
        res.redirect('/users/login')
    }
}