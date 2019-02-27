import { TestBed, async } from '@angular/core/testing';
import { NewsService } from './news.service';
import { IArticle } from 'src/interfaces';

describe('NewsService', () => {
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
  let service: NewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({})
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(NewsService);
  });

  describe('showNews() method', () => {
    it('should call "emit" method of showNewsEvent EventEmitter', () => {
      spyOn(service.showNewsEvent, 'emit');

      service.showNews(news.id);

      expect(service.showNewsEvent.emit).toHaveBeenCalledWith(news.id);
    });
  });

  describe('editNews() method', () => {
    it('should call "emit" method of editNewsEvent EventEmitter', () => {
      spyOn(service.editNewsEvent, 'emit');

      service.editNews(news.id);

      expect(service.editNewsEvent.emit).toHaveBeenCalledWith(news.id);
    });
  });

  describe('deleteNews() method', () => {
    it('should call "emit" method of deleteNewsEvent EventEmitter', () => {
      spyOn(service.deleteNewsEvent, 'emit');

      service.deleteNews(news.id);

      expect(service.deleteNewsEvent.emit).toHaveBeenCalledWith(news.id);
    });
  });

  describe('wordsFilter() method', () => {
    it('should call "emit" method of wordsFilterEvent EventEmitter', () => {
      const words = 'words words';
      spyOn(service.wordsFilterEvent, 'emit');

      service.wordsFilter(words);

      expect(service.wordsFilterEvent.emit).toHaveBeenCalledWith(words);
    });
  });

  describe('setToCache() method', () => {
    it('should set cache by key', () => {
      const key = 'key';
      const data = [1, 2, 3];

      service.setToCache(key, data);

      expect(service.cache[key]).toEqual(data);
    });
  });

  describe('getFromCache() method', () => {
    it('should set cache by key', () => {
      const key = 'key';
      const data = [news];

      service.setToCache(key, data);
      const dataCache = service.getFromCache(key);

      expect(service.cache[key]).toEqual(dataCache);
    });
  });

  describe('getFromCacheById() method', () => {
    it('should get data from cache by id', () => {
      const key = 'key';
      const data = [news];

      service.setToCache(key, data);
      const dataCache = service.getFromCacheById(key, news.id);

      expect(news).toEqual(dataCache);
    });
  });

  describe('editToCacheById() method', () => {
    it('should edit cache by key when have data', () => {
      const key = 'key';
      const newNews = [{...news, content: 'newcontent'}];

      service.cache[key] = [news];
      service.editToCacheById(key, newNews[0]);

      expect(service.cache[key]).toEqual(newNews);
    });
  });

  describe('editToCacheById() method', () => {
    it('not should edit cache by key when not have data', () => {
      const key = 'key';
      const newNews = [{...news, content: 'newcontent'}];

      service.editToCacheById(key, newNews[0]);

      expect(service.cache[key]).toBeUndefined();
    });
  });

  describe('removeFromCacheById() method', () => {
    it('not should edit cache by key when not have data', () => {
      const key = 'key';
      const data = [news];

      service.setToCache(key, data);
      service.removeFromCacheById(key, news.id);

      expect(service.cache[key].length).toBe(0);
    });
  });
});
