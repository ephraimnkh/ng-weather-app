import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeItemInLocalStorage(key: string, item: string) {
    try {
      localStorage.setItem(key, item);
    } catch (error: any) {
      console.error(`storeItemInLocalStorage(key: ${key}, item: ${item}) Error:`, error);
    }
  }
  
  getItemFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }
  
  removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearAllLocalStorageItems() {
    localStorage.clear();
  }
}
