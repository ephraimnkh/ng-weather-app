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

  it('should be light mode', () => {
    service.switchToLightMode();
    expect(service.selectedTheme).toEqual('Light');
  });
  
  it('should be dark mode', () => {
    service.switchToDarkMode();
    expect(service.selectedTheme).toEqual('Dark');
  });

  it('should be system default mode after calling switchToLightMode() with true', () => {
    service.switchToLightMode(true);
    expect(service.selectedTheme).toEqual('Default');
  });
  
  it('should be system default mode after calling switchToDarkMode() with true', () => {
    service.switchToDarkMode(true);
    expect(service.selectedTheme).toEqual('Default');
  });
  
  it('should be system default mode after calling useSystemDefault()', () => {
    service.useSystemDefault();
    expect(service.selectedTheme).toEqual('Default');
  });
});
