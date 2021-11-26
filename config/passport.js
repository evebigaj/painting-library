const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

//assumes you're calling these precisely "username" and "password"
const verifyCallback = (username, password, done) => {
//so this is the place for the find user & verify password logic
// what I don't get is what done will be doing
}
const strategy = new LocalStrategy()

passport.use(new LocalStrategy( verifyCallback
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }


));
