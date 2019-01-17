import express from 'express';
import dataNews from '../data-news';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json(dataNews);
});

export default router;
