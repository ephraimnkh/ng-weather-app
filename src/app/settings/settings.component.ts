import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { WeatherService } from '../services/weather.service';
import { LocationService } from '../services/location.service';
import { StorageService } from '../services/storage.service';
import { CITY_NAME_LOCAL_STORAGE_KEY, COUNTRY_NAME_LOCAL_STORAGE_KEY, SELECTED_VOICE_LOCAL_STORAGE_KEY } from '../shared/const';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  searchingForLocation = false;
  voices: any[] | undefined;
  homeComponent: HomeComponent = new HomeComponent(this.weatherService, this.locationService, this.storageService);
  selectedVoice: number | null = null;
  newlySelectedVoice: string | null = null;
  saving = false;
  clearingLocationData = false;
  currentCitySelected: string | null = '';
  currentCountrySelected: string | null = '';
  countries: any[] | undefined;
  
  constructor (
    private weatherService: WeatherService, 
    private locationService: LocationService, 
    private storageService: StorageService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getVoices()
    .then(voices => {
      this.voices = voices;
    });
    this.selectedVoice = parseInt(this.storageService.getItemFromLocalStorage(SELECTED_VOICE_LOCAL_STORAGE_KEY) || '');
    this.currentCitySelected = this.storageService.getItemFromLocalStorage(CITY_NAME_LOCAL_STORAGE_KEY);
    this.apiService.getCountries().subscribe({
      next: (countries: any) => {
        this.countries = countries;
        this.currentCountrySelected = this.storageService.getItemFromLocalStorage(COUNTRY_NAME_LOCAL_STORAGE_KEY);
      },
      error: (error: any) => {
        console.error(`apiService.getCountryCodes() Error:`, error);
      }
    });
  }

  getVoices(): Promise<any[]> {
    return new Promise(resolve => {
      let checkForVoicesInterval: string | number | NodeJS.Timer | undefined;
      checkForVoicesInterval = setInterval(() => {
        const voices = speechSynthesis.getVoices();
        if (voices.length !== 0) {
          resolve(voices)
          clearInterval(checkForVoicesInterval);
        }
      }, 1000);
    });
  }

  selectVoice(event: any) {
    this.newlySelectedVoice = event.target.value;
  }

  saveSettings() {
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
    }, 1000);
    if (this.newlySelectedVoice) {
      this.storageService.storeItemInLocalStorage(SELECTED_VOICE_LOCAL_STORAGE_KEY, this.newlySelectedVoice);
    }
  }
  
  clearLocationData() {
    this.clearingLocationData = true;
    setTimeout(() => {
      this.storageService.removeItemFromLocalStorage(CITY_NAME_LOCAL_STORAGE_KEY);
      this.storageService.removeItemFromLocalStorage(COUNTRY_NAME_LOCAL_STORAGE_KEY);
      this.clearingLocationData = false;
    }, 1000);
  }

  searchForLocation(event: any) {
    this.searchingForLocation = true;
    this.homeComponent.searchForLocation(event);
    this.searchingForLocation = false;
  }

  isCurrentLocationDataNotThere(): boolean {
    const currentCity = this.storageService.getItemFromLocalStorage(CITY_NAME_LOCAL_STORAGE_KEY);
    const currentCountry = this.storageService.getItemFromLocalStorage(COUNTRY_NAME_LOCAL_STORAGE_KEY);
    return currentCity === null && currentCountry === null;
  }
}
