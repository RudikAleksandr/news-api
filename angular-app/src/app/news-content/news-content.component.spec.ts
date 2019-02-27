import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsContentComponent } from './news-content.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import config from '../../config';

describe('NewsContentComponent', () => {
  let component: NewsContentComponent;
  let fixture: ComponentFixture<NewsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsContentComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'content/:source/:id', component: NewsContentComponent}
          ]
        ),
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsContentComponent);
    component = fixture.componentInstance;
    spyOn(component.route.params, 'subscribe');
    fixture.detectChanges();
  });


  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('ngOnInit() method', () => {
    it('should call "subscribe" method router params', () => {
      component.ngOnInit();

      expect(component.route.params.subscribe).toHaveBeenCalled();
    });
  });

  describe('handlerRouteParams() method', () => {
    it('should call "getUserNewsById" service method when id source equal id user source', () => {
      const params = {
        id: 'id',
        source: config.ID_USER_SOURCE,
      };
      spyOn(component.newsUserService, 'getUserNewsById').and.returnValue({subscribe: () => {}});

      component.handlerRouteParams(params);

      expect(component.newsUserService.getUserNewsById).toHaveBeenCalledWith(params.id);
    });

    it('should set "news" field when id source not equal id user source', () => {
      const data = 'data';
      const params = {
        id: 'id',
        source: 'source',
      };
      spyOn(component.newsService, 'getFromCacheById').and.returnValue(data);

      component.handlerRouteParams(params);

      expect(component.news).toBe(data);
    });
  });

  describe('onClickBack() method', () => {
    it('should call "navigate" method for router', () => {
      spyOn(component.router, 'navigate');

      component.onClickBack();

      expect(component.router.navigate).toHaveBeenCalledWith(['']);
    });
  });

  describe('onClickEdit() method', () => {
    it('should call "navigate" method for router', () => {
      spyOn(component.router, 'navigate');

      component.onClickEdit();

      expect(component.router.navigate).toHaveBeenCalledWith([`/${config.ROUTE_EDIT}`, component.news.id]);
    });
  });

  describe('onClickDelete() method', () => {
    it('should call "removeFromCacheById" service method', () => {
      spyOn(component.newsService, 'removeFromCacheById');
      spyOn(component.newsUserService, 'removeUserNewsById').and.returnValue({subscribe: () => {}});

      component.onClickDelete();

      expect(component.newsService.removeFromCacheById).toHaveBeenCalledWith(config.ID_USER_SOURCE, component.news.id);
    });
  });

  describe('onClickDelete() method', () => {
    it('should call "removeFromCacheById" service method', () => {
      spyOn(component.newsService, 'removeFromCacheById');
      spyOn(component.newsUserService, 'removeUserNewsById').and.returnValue({subscribe: () => {}});

      component.onClickDelete();

      expect(component.newsService.removeFromCacheById).toHaveBeenCalledWith(config.ID_USER_SOURCE, component.news.id);
    });
  });
});
