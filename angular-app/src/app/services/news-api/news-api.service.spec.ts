import { TestBed, async } from '@angular/core/testing';
import { NewsApiService } from './news-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import config from 'src/config';

describe('NewsApiService', () => {
  let service: NewsApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(NewsApiService);
  });

  describe('httpGetAllSources() method', () => {
    it('should call "get" method of http service', () => {
      spyOn(service.http, 'get').and.returnValue({pipe: () => {}});

      service.httpGetAllSources();

      expect(service.http.get).toHaveBeenCalledWith(config.URL_ALL_SOURCES);
    });
  });

  describe('httpGetArticlesSource() method', () => {
    it('should call "get" method of http service', () => {
      const idSource = 'id';
      const numberArticles = 5;
      spyOn(service.http, 'get').and.returnValue({pipe: () => {}});

      service.httpGetArticlesSource(idSource, numberArticles);

      expect(service.http.get).toHaveBeenCalledWith(`${config.URL_SOURCE}/?sources=${idSource}&pageSize=${numberArticles}`, {
        headers: {
          'X-Api-Key': config.API_KEY,
        }}
      );
    });
  });
});
