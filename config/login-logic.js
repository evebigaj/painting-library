const {Router} = require('express')
const login = new Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const {findCustomer, checkPassword} = require('../database/customer-methods')

//assumes you're calling these precisely "username" and "password"
const verifyCallback = (username, password, done) => {
    findCustomer(username)
    .then(foundUser => {if(!foundUser){
        return done(null, false, {message: 'Incorrect username'})
        //how to access error? 
    }})
    .then(()=> checkPassword(username, password))
    .then(truthValue => {if(!truthValue){
        return done(null, false, { message: 'Incorrect password.' })
    }
    else{return done(null, user)}
})
.catch(e => {console.log(`oops: ${e}`)
return e})
//so this is the place for the find user & verify password logic
// what I don't get is what done will be doing
}
const strategy = new LocalStrategy(verifyCallback)
passport.use(strategy)

login.post('/',
  passport.authenticate('local', { session: false }),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

  module.exports = {login}