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

// passport.use(new LocalStrategy( verifyCallback
// //   function(username, password, done) {
// //     User.findOne({ username: username }, function(err, user) {
// //       if (err) { return done(err); }
// //       if (!user) {
// //         return done(null, false, { message: 'Incorrect username.' });
// //       }
// //       if (!user.validPassword(password)) {
// //         return done(null, false, { message: 'Incorrect password.' });
// //       }
// //       return done(null, user);
// //     });
// //   }


// ));
