import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditAddComponent } from './news-edit-add.component';

describe('NewsEditAddComponent', () => {
  let component: NewsEditAddComponent;
  let fixture: ComponentFixture<NewsEditAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsEditAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
