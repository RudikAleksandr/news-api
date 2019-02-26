import express from 'express';
import passport from '../auth'; 

const router = express.Router();

router.post('/login', 
  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/login',
}));

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/auth/facebook', 
  passport.authenticate('facebook')
);

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;