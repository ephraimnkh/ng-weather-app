import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LightDarkModeService } from 'src/app/services/light-dark-mode.service';
import { StorageService } from 'src/app/services/storage.service';
import { SETTINGS_PATH } from 'src/app/shared/const';
import { SearchEvent, SearchType, SearchTypeDropdownText, Theme } from 'src/app/shared/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  _searchingForLocation = false;
  @Output() searchLocation: EventEmitter<SearchEvent> = new EventEmitter();
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Input() hideSearch = false;

  citySearch = ``;
  countrySearch = ``;
  searchType: SearchType = 'city';
  searchTypeDropdownText: SearchTypeDropdownText = 'City';
  lightOrDarkTheme: Theme = 'Light';
  currentUrlPath: string | undefined;
  countries: any[] = [];

  constructor(
    private lightDarkModeService: LightDarkModeService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    const state: RouterState = router.routerState;
    const snapshot: RouterStateSnapshot = state.snapshot;
    this.currentUrlPath = snapshot.url;
  }


  ngOnInit(): void {
    this.lightOrDarkTheme = this.lightDarkModeService.selectedTheme;
    this.apiService.getCountries().subscribe({
      next: (countries: any) => {
        this.countries = countries;
      },
      error: (error: any) => {
        console.error(`apiService.getCountryCodes() Error:`, error);
      }
    });
  }

  get isHomePage(): boolean {
    return this.currentUrlPath === '/';
  }
  
  get isSettingsPage(): boolean {
    return this.currentUrlPath === `/${SETTINGS_PATH}`;
  }

  setSearchType(searchType: SearchType) {
    this.searchType = searchType;
    if (this.searchType === 'city') this.searchTypeDropdownText = 'City';
    if (this.searchType === 'city_country') this.searchTypeDropdownText = 'City & Country';
  }

  get searchingForLocation(): boolean {
    return this._searchingForLocation;
  }

  @Input() set searchingForLocation(value: boolean) {
    this._searchingForLocation = value;
    if (value === false) {
      this.citySearch = ``;
      this.countrySearch = ``;
    }
  }

  emitSearchRequest() {
    const city = this.citySearch;
    const country = this.countrySearch;
    const searchEvent: SearchEvent = country ? { city, country } : { city };
    this.searchLocation.emit(searchEvent);
  }

  switchTheme(theme: Theme) {
    this.lightOrDarkTheme = theme;
    if (theme === 'Light') this.lightDarkModeService.switchToLightMode();
    if (theme === 'Dark') this.lightDarkModeService.switchToDarkMode();
    if (theme === 'Default') this.lightDarkModeService.useSystemDefault();
    this.storageService.storeItemInLocalStorage('theme', theme);
  }
}
