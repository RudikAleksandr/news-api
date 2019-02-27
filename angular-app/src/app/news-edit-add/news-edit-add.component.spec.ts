import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NewsEditAddComponent } from './news-edit-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsUserService } from '../services/news-user/news-user.service';

describe('NewsEditAddComponent', () => {
  const news = {
    author: 'string',
    content: 'string',
    description: 'string',
    publishedAt: 'string',
    title: 'string',
    url: 'string',
    urlToImage: 'string',
    isUserNews: true,
  };
  let component: NewsEditAddComponent;
  let fixture: ComponentFixture<NewsEditAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'edit/:id', component: NewsEditAddComponent}
          ]
        ),
      ],
      declarations: [ NewsEditAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('onClickSave() method', () => {
    it('should call "addNews" method newsUserService when page for add', () => {
      news.publishedAt = '';
      component.id = 'id';
      component.newsFormGroup.setValue(news);
      component.isAdd = true;
      spyOn(component.newsUserService, 'addNews').and.returnValue({subscribe: () => {}});

      component.onClickSave();

      expect(component.newsUserService.addNews).toHaveBeenCalled();
    });
  });

  describe('onClickSave() method', () => {
    it('should call "editNews" method newsUserService when page for edit', () => {
      component.id = 'id';
      component.newsFormGroup.setValue(news);
      component.isAdd = false;
      spyOn(component.newsUserService, 'editNews').and.returnValue({subscribe: () => {}});

      component.onClickSave();

      expect(component.newsUserService.editNews).toHaveBeenCalled();
    });
  });

  describe('onClickCancel() method', () => {
    it('should call "navigate" method router', () => {
      spyOn(component.router, 'navigate');

      component.onClickCancel();

      expect(component.router.navigate).toHaveBeenCalled();
    });
  });

  describe('handlerRouteParams() method', () => {
    it('should call "getUserNewsById" method newsUserService', () => {
      const params = {
        id: 'id',
      };
      spyOn(component.newsUserService, 'getUserNewsById').and.returnValue({subscribe: () => {}});

      component.handlerRouteParams(params);

      expect(component.newsUserService.getUserNewsById).toHaveBeenCalled();
    });
  });

  describe('setControl() method', () => {
    it('should set controls', () => {
      component.setControl(news);

      expect(component.titleControl.value).toBe(news.title);
      expect(component.descriptionControl.value).toBe(news.description);
      expect(component.contentControl.value).toBe(news.content);
      expect(component.urlToImageControl.value).toBe(news.urlToImage);
      expect(component.publishedAtControl.value).toBe(news.publishedAt);
      expect(component.authorControl.value).toBe(news.author);
      expect(component.urlControl.value).toBe(news.url);
    });
  });

  describe('setControl() method', () => {
    it('should call "navigate" method router service', () => {
      spyOn(component.router, 'navigate');

      component.setControl(null);

      expect(component.router.navigate).toHaveBeenCalled();
    });
  });
});
