import { TestBed } from '@angular/core/testing';

import { NewsUserService } from './news-user.service';

describe('NewsUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsUserService = TestBed.get(NewsUserService);
    expect(service).toBeTruthy();
  });
});
