const passport = require('passport')

// 1:02:16
const LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    User = require('../models/User')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({ email: email })
                .then((user)=> {
                    if(!user) {
                        // Params: error, user, options
                        return done(null, false, { message: 'That email is not registered'})
                    } 
                    
                    //Match Password
                    // Params: input password, hashed password from db, callback
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err

                        if(isMatch) 
                            return done(null, user)
                        else
                            return done(null, false, { message: 'Password incorrect'})
                    })
                })
                .catch(err =>  console.log(err))    
        }) // LocalStrategy
    ) // passport.use

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
}