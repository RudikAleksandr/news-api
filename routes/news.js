import express from 'express';
import * as DbNews from '../db/news'; 

const router = express.Router();

router.get('/', (req, res) => {
  DbNews.findAllNews((err, newsData) => {
    if (err) {
      res.json(err);
    } 

    res.json(newsData);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  DbNews.findNewsById(id, (err, newsData) => {
    if (err) {
      res.json(err);
    } 

    res.json(newsData);
  });
});

router.post('/', (req, res) => {
  const news = req.body; 
  DbNews.createNews(news, (err, newsData) => {
    if (err) {
      res.json(err);
    } 

    res.json(newsData);
  });
});

router.put('/:id', (req, res) => {
  const news = req.body;
  const id = req.params.id;
  DbNews.updateNewsById(id, news, (err, newsData) => {
    if (err) {
      res.json(err);
    } 

    res.json(newsData);
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  DbNews.removeNewsById(id, (err, newsData) => {
    if (err) {
      res.json(err);
    } 

    res.json(newsData);
  });
});

export default router;
