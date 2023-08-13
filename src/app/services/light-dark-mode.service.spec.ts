import { TestBed } from '@angular/core/testing';

import { LightDarkModeService } from './light-dark-mode.service';

describe('LightDarkModeService', () => {
  let service: LightDarkModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightDarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
