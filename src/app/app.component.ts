import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Theme } from './shared/types';
import { LightDarkModeService } from './services/light-dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-weather-app';

  constructor(
    private lightDarkModeService: LightDarkModeService,
    private storageService: StorageService
  ) {}
  
  ngOnInit(): void {
    const themeFromLocalStorage = this.storageService.getItemFromLocalStorage('theme');
    if (themeFromLocalStorage === "Light" || themeFromLocalStorage === "Dark" || themeFromLocalStorage === 'Default') {
      this.switchTheme(themeFromLocalStorage);
    } else {
      this.lightDarkModeService.useSystemDefault();
    }
  }

  switchTheme(theme: Theme) {
    if (theme === 'Light') this.lightDarkModeService.switchToLightMode();
    if (theme === 'Dark') this.lightDarkModeService.switchToDarkMode();
    if (theme === 'Default') this.lightDarkModeService.useSystemDefault();
    this.storageService.storeItemInLocalStorage('theme', theme);
  }
}
