import passport from 'passport';
import passportLocal from 'passport-local';
import * as DbUser from './db/user/user-db'; 

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  DbUser.findUser({ username, password }, (err, user) => {
    console.log(user);
    if (err) { 
      return done(err); 
    }
    if (!user) { 
      return done(null, false); 
    }
    
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  done(null, {username});
});


export default passport;