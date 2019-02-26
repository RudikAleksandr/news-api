import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.session.passport);
  res.render('index', { title: 'Express' });
});

export default router;
