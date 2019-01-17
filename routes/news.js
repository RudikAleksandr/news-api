import express from 'express';
import dataNews from '../data-news';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json(dataNews);
});

router.get('/:id', (req, res, next) => {
  const news = dataNews[req.params.id];
  res.json(news);
});

router.post('/', (req, res, next) => {
  const news = req.body;
 
  dataNews[news.id] = news;
  res.json(news);
});

router.put('/:id', (req, res, next) => {
  const reqNews = req.body;
  const updateNews = dataNews[reqNews.id];
  
  Object.keys(reqNews).forEach(key => {
    if (key in updateNews) {
      updateNews[key] = reqNews[key];
    }
  });

  res.json(updateNews);
});

router.delete('/:id', (req, res, next) => {
  const result = delete dataNews[req.params.id];
  res.json({result});
});

export default router;
