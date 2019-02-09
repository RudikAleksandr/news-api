import express from 'express';
import passport from '../auth'; 

const router = express.Router();

router.post('/login', 
  passport.authenticate('local', { 
    failureRedirect: '/login',
    successRedirect: '/', 
}));

router.get('/login', (req, res, next) => {
  res.render('login');
});
export default router;