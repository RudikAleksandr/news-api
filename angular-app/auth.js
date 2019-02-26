import passport from 'passport';
import passportLocal from 'passport-local';
import passportFacebook from 'passport-facebook';
import * as DbUser from './db/user/user-db'; 

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

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

passport.use('facebook', new FacebookStrategy({
  clientID: '712231772474627',
  clientSecret: '14b2cba20c4dbbdf8c4b9a8a91d3ca45',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
}, (access_token, refresh_token, profile, done) => {
  DbUser.findUserById(profile.id, (err, user) => {
    if (user) {
      return done(null, user); 
    } else {
      console.log(profile);
      const newUser = {
        _id: profile.id,
        username: profile.displayName, 
        password: 'facebook',
      };

      DbUser.createUser(newUser, (err, user) => {
        done(null, user);
      });
    } 
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  done(null, {username});
});


export default passport;