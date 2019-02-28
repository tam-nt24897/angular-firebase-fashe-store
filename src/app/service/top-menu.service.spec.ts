import { TestBed } from '@angular/core/testing';

import { TopMenuService } from './top-menu.service';

describe('TopMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopMenuService = TestBed.get(TopMenuService);
    expect(service).toBeTruthy();
  });
});
