import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store item name as \'Ephraim\' in local storage and retrieve that name from local storage', () => {
    service.storeItemInLocalStorage('name', 'Ephraim');
    const name = service.getItemFromLocalStorage('name');
    expect(name).toEqual('Ephraim');
  });
  
  it('should store item name as \'Ephraim\' in local storage and delete that name from local storage', () => {
    service.storeItemInLocalStorage('name', 'Ephraim');
    service.removeItemFromLocalStorage('name');
    const name = service.getItemFromLocalStorage('name');
    expect(name).toBeNull();
  });
  
  it('should store several names in local storage and delete all local storage data', () => {
    const names = ['Ephraim', 'Tony', 'Matthew', 'Mark'];
    names.forEach((name: string, index: number) => {
      service.storeItemInLocalStorage(`name${index}`, name);
    });
    service.clearAllLocalStorageItems();
    const { localStorageLength } = service;
    expect(localStorageLength).toEqual(0);
  });
});
