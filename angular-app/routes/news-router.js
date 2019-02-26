import express from 'express';
import * as DbNews from '../db/news/news-db';

const router = express.Router();

router.get('/', (req, res) => {
  DbNews.findAllNews((err, newsData) => {
    if (err) {
      res.json(err);
    }

    const newsDataMap = newsData.map((item) => {
      return {
        author: item.author,
        content: item.content,
        description: item.description,
        isUserNews: item.isUserNews,
        publishedAt: item.publishedAt,
        title: item.title,
        url: item.url,
        urlToImage: item.urlToImage,
        id: item._id,
      };
    });

    res.json(newsDataMap);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  DbNews.findNewsById(id, (err, newsData) => {
    if (err) {
      res.json(err);
    }

    const newNewsData = {
        author: newsData.author,
        content: newsData.content,
        description: newsData.description,
        isUserNews: newsData.isUserNews,
        publishedAt: newsData.publishedAt,
        title: newsData.title,
        url: newsData.url,
        urlToImage: newsData.urlToImage,
        id: newsData._id,
      };
    res.json(newNewsData);
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
