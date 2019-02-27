import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderAppComponent } from './header-app/header-app.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationEnd } from '@angular/router';
import { IArticle } from 'src/interfaces';

describe('AppComponent', () => {
  const news: IArticle = {
    author: 'string',
    content: 'string',
    description: 'string',
    publishedAt: 'string',
    title: 'string',
    url: 'string',
    urlToImage: 'string',
  };
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        HeaderAppComponent,
        NewsListComponent,
        NewsItemComponent,
        FilterPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('ngOnInit() method', () => {
    it('should call "initSourcesNews" method', () => {
      spyOn(component, 'initSourcesNews');

      component.ngOnInit();

      expect(component.initSourcesNews).toHaveBeenCalled();
    });
  });

  describe('initSourcesNews() method', () => {
    it('should call "httpGetAllSources" method newsApiService service', () => {
      spyOn(component.newsApiService, 'httpGetAllSources').and.returnValue({subscribe: () => {}});

      component.initSourcesNews();

      expect(component.newsApiService.httpGetAllSources).toHaveBeenCalled();
    });
  });

  describe('httpGetArticlesSource() method', () => {
    it('should call "httpGetArticlesSource" method newsApiService service', () => {
      spyOn(component.newsApiService, 'httpGetArticlesSource').and.returnValue({subscribe: () => {}});

      component.httpGetArticlesSource('source');

      expect(component.newsApiService.httpGetArticlesSource).toHaveBeenCalled();
    });
  });

  describe('loadNews() method', () => {
    it('should push "viewNews" field', () => {
      const data: Array<IArticle> = [news, news];
      component.viewNews = [];
      component.COUNT_ADD_VIEW_NEWS = 2;
      spyOn(component, 'getIdSelectedSource').and.returnValue('id');
      spyOn(component.newsService, 'getFromCache').and.returnValue(data);

      component.loadNews();

      expect(data).toEqual(component.viewNews);
    });

    it('should call "getUserNews" method newsUserService service', () => {
      component.viewNews = [];
      component.COUNT_ADD_VIEW_NEWS = 2;
      component.isUserNews = true;
      spyOn(component, 'getIdSelectedSource').and.returnValue('id');
      spyOn(component.newsService, 'getFromCache').and.returnValue([]);
      spyOn(component.newsUserService, 'getUserNews').and.returnValue({subscribe: () => {}});

      component.loadNews();

      expect(component.newsUserService.getUserNews).toHaveBeenCalled();
    });

    it('should call "httpGetArticlesSource" method', () => {
      component.viewNews = [];
      component.COUNT_ADD_VIEW_NEWS = 2;
      component.isUserNews = false;
      spyOn(component, 'getIdSelectedSource').and.returnValue('id');
      spyOn(component.newsService, 'getFromCache').and.returnValue([]);
      spyOn(component, 'httpGetArticlesSource');

      component.loadNews();

      expect(component.httpGetArticlesSource).toHaveBeenCalled();
    });

  });

  describe('handlerSelectedSource() method', () => {
    it('should call "setNewsBySourceId" method', () => {
      spyOn(component, 'setNewsBySourceId');

      component.handlerSelectedSource('id');

      expect(component.setNewsBySourceId).toHaveBeenCalled();
    });

    it('should set empty "viewNews" field', () => {
      component.handlerSelectedSource('');

      expect(component.viewNews).toEqual([]);
    });
  });

  describe('handlerCreatedUserNews() method', () => {
    it('should call "setNewsBySourceId" method', () => {
      spyOn(component, 'setNewsBySourceId');
      spyOn(component, 'getIdSelectedSource').and.returnValue(1);

      component.handlerCreatedUserNews(true);

      expect(component.setNewsBySourceId).toHaveBeenCalled();
    });

    it('should set empty "viewNews" field', () => {
      spyOn(component, 'getIdSelectedSource').and.returnValue(1);

      component.handlerCreatedUserNews(false);

      expect(component.viewNews).toEqual([]);
    });
  });

  describe('handlerClickLoad() method', () => {
    it('should call "loadNews" method', () => {
      spyOn(component, 'loadNews');

      component.handlerClickLoad();

      expect(component.loadNews).toHaveBeenCalled();
    });
  });

  describe('handlerDeleteNews() method', () => {
    it('should call "removeUserNewsById" method newsUserService service', () => {
      spyOn(component.newsUserService, 'removeUserNewsById').and.returnValue({subscribe: () => {}});

      component.handlerDeleteNews('id');

      expect(component.newsUserService.removeUserNewsById).toHaveBeenCalled();
    });
  });

  describe('setRouterNavigate() method', () => {
    it('should call "navigate" method', () => {
      spyOn(component.router, 'navigate');

      component.setRouterNavigate('config');

      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('handlerEditContent() method', () => {
    it('should call "setRouterNavigate" method', () => {
      spyOn(component, 'setRouterNavigate');

      component.handlerShowContent('id');

      expect(component.setRouterNavigate).toHaveBeenCalled();
    });
  });

  describe('handlerEditContent() method', () => {
    it('should call "setRouterNavigate" method', () => {
      spyOn(component, 'setRouterNavigate');

      component.handlerEditContent('id');

      expect(component.setRouterNavigate).toHaveBeenCalled();
    });
  });

  describe('handlerAddArticle() method', () => {
    it('should call "setRouterNavigate" method', () => {
      spyOn(component, 'setRouterNavigate');

      component.handlerAddArticle();

      expect(component.setRouterNavigate).toHaveBeenCalled();
    });
  });

  describe('handlerRouterEvents() method', () => {
    it('should call "setNewsBySourceId" method', () => {
      spyOn(component, 'setNewsBySourceId');
      spyOn(component, 'getIdSelectedSource').and.returnValue(1);

      const data = new NavigationEnd(1, '/', '/');
      component.handlerRouterEvents(data);

      expect(component.setNewsBySourceId).toHaveBeenCalled();
    });
  });


});
