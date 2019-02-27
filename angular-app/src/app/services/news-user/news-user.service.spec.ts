import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsUserService } from './news-user.service';
import { IArticle } from 'src/interfaces';

describe('NewsUserService', () => {
  const news = {
    author: 'string',
    content: 'string',
    description: 'string',
    publishedAt: 'string',
    title: 'string',
    url: 'string',
    urlToImage: 'string',
    id: 'string',
  };
  let service: NewsUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(NewsUserService);
  });

  describe('getUserNews() method', () => {
    it('should call "get" method of http service', () => {
      spyOn(service.http, 'get').and.returnValue({pipe: () => {}});

      service.getUserNews();

      expect(service.http.get).toHaveBeenCalledWith('/news');
    });
  });

  describe('getUserNewsById() method', () => {
    it('should call "get" method of http service', () => {
      spyOn(service.http, 'get');

      service.getUserNewsById(news.id);

      expect(service.http.get).toHaveBeenCalledWith(`/news/${news.id}`);
    });
  });

  describe('editNews() method', () => {
    it('should call "put" method of http service', () => {
      spyOn(service.http, 'put');

      service.editNews(news);

      expect(service.http.put).toHaveBeenCalledWith(`/news/${news.id}`, news);
    });
  });

  describe('removeUserNewsById() method', () => {
    it('should call "delete" method of http service', () => {
      spyOn(service.http, 'delete');

      service.removeUserNewsById(news.id);

      expect(service.http.delete).toHaveBeenCalledWith(`/news/${news.id}`);
    });
  });

  describe('addNews() method', () => {
    it('should call "post" method of http service', () => {
      spyOn(service.http, 'post');

      service.addNews(news);

      expect(service.http.post).toHaveBeenCalledWith(`/news`, news);
    });
  });

  describe('setIdForNewsAPI() method', () => {
    it('should set "id" filed for elements of news', () => {
      let dataNews: Array<IArticle> = [news, news];
      news.id = news.publishedAt.replace(/-|:/g, '');

      const data = service.setIdForNewsAPI(dataNews);
      dataNews = [news, news];

      expect(dataNews).toEqual(data);
    });
  });
});
