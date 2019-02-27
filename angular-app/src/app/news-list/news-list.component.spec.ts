import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsListComponent } from './news-list.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { FilterPipe } from '../pipes/filter/filter.pipe';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsListComponent, NewsItemComponent, FilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('handlerClickLoadButton() method', () => {
    it('should emit "clickLoadButton" event', () => {
      spyOn(component.clickLoadButton, 'emit');

      component.handlerClickLoadButton();

      expect(component.clickLoadButton.emit).toHaveBeenCalled();
    });
  });

  describe('handlerFilterNews() method', () => {
    it('should set "wordsFilter" field', () => {
      const data = 'wordsForFilter';

      component.handlerFilterNews(data);

      expect(component.wordsFilter).toBe(data);
    });
  });
});
