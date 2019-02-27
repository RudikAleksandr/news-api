import { FilterPipe } from './filter.pipe';
import { IArticle } from 'src/interfaces';

describe('FilterPipe', () => {
  const news: IArticle = {
    author: 'string',
    content: 'string',
    description: 'string',
    publishedAt: 'string',
    title: 'string',
    url: 'string',
    urlToImage: 'string',
    id: 'string',
  };
  let pipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  describe('transform() method', () => {
    it('should return find news', () => {
      const data = pipe.transform([news], 'string');

      expect([news]).toEqual(data);
    });

    it('should return all news', () => {
      const data = pipe.transform([news], '');

      expect([news]).toEqual(data);
    });
  });
});
