import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderAppComponent } from './header-app.component';
import config from 'src/config';

describe('HeaderAppComponent', () => {
  let component: HeaderAppComponent;
  let fixture: ComponentFixture<HeaderAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAppComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
           {path: 'header/', component: HeaderAppComponent}
        ]),
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('onChangeCreatedMe() method', () => {
    it('should set "title" field when created user news', () => {
      component.isCreatedUserNews = false;

      component.onChangeCreatedMe();

      expect(config.NAME_USER_NEWS).toBe(component.title);
    });
  });

  describe('onChangeCreatedMe() method', () => {
    beforeEach(() => {
      spyOn(component.createdUserNews, 'emit');
    });

    it('should set "title" field when has name source', () => {
      component.isCreatedUserNews = true;
      component.nameSource = 'name';

      component.onChangeCreatedMe();

      expect('name').toBe(component.title);
    });

    it('should set "title" field when has not name source and user', () => {
      component.isCreatedUserNews = true;
      component.nameSource = '';

      component.onChangeCreatedMe();

      expect('').toBe(component.title);
    });
  });

  describe('onChangeSource() method', () => {
    it('should set field when has source', () => {
      spyOn(component, 'idSelectedSource');

      const event = {
        target: {
          value: 0,
        },
      };

      const source = {
        name: 'name',
        id: 'id',
      };

      component.sources = [source];
      component.onChangeSource(event);

      expect(source.name).toBe(component.title);
      expect(source.name).toBe(component.nameSource);
    });

    it('should set empty field when not has source', () => {
      spyOn(component, 'idSelectedSource');

      const event = {
        target: {
          value: 1,
        },
      };

      component.sources = [];
      component.onChangeSource(event);

      expect('').toBe(component.nameSource);
    });

    it('should set "title" field to name user news when not has source', () => {
      spyOn(component, 'idSelectedSource');

      const event = {
        target: {
          value: 1,
        },
      };

      component.sources = [];
      component.isCreatedUserNews = true;
      component.onChangeSource(event);

      expect(config.NAME_USER_NEWS).toBe(component.title);
    });
  });

  describe('onClickFilter() method', () => {
    it('should call "wordsFilter" method news service', () => {
      spyOn(component.newsService, 'wordsFilter');

      component.onClickFilter();

      expect(component.newsService.wordsFilter).toHaveBeenCalled();
    });
  });

  describe('onchangeKeyWords() method', () => {
    it('should set "keyWords" field', () => {
      const event = {
        target: {
          value: 'value',
        },
      };

      component.onchangeKeyWords(event);

      expect(event.target.value).toBe(component.keyWords);
    });
  });

  describe('onClickAdd() method', () => {
    it('should call "emit" method', () => {
      spyOn(component.addArticle, 'emit');

      component.onClickAdd();

      expect(component.addArticle.emit).toHaveBeenCalled();
    });
  });

});
