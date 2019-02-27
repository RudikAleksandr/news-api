import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsItemComponent } from './news-item.component';

describe('NewsItemComponent', () => {
  let component: NewsItemComponent;
  let fixture: ComponentFixture<NewsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsItemComponent);
    component = fixture.componentInstance;

    component.news = {
      author: 'string',
      content: 'string',
      description: 'string',
      publishedAt: new Date().toString(),
      title: 'string',
      url: 'string',
      urlToImage: 'string',
      id: 'string',
      isUserNews: true,
      source: {},
    }
    fixture.detectChanges();
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('handlerShowContent() method', () => {
    it('should call "showNews" service method', () => {
      spyOn(component.newsService, 'showNews');

      component.handlerShowContent();

      expect(component.newsService.showNews).toHaveBeenCalledWith(component.news.id);
    });
  });

  describe('handlerDeleteNews() method', () => {
    it('should call "deleteNews" service method', () => {
      spyOn(component.newsService, 'deleteNews');

      component.handlerDeleteNews();

      expect(component.newsService.deleteNews).toHaveBeenCalledWith(component.news.id);
    });
  });

  describe('handlerEditNews() method', () => {
    it('should call "editNews" service method', () => {
      spyOn(component.newsService, 'editNews');

      component.handlerEditNews();

      expect(component.newsService.editNews).toHaveBeenCalledWith(component.news.id);
    });
  });
});
