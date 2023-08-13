import { Component, OnInit } from '@angular/core';
import { createDateFromUnixTimestamp, getDayText, getMonthText, retrieveTimeForDate, retrieveTimeForDateWithSeconds } from 'src/util/date.util';
import { WeatherService } from '../services/weather.service';
import { ForecastWeatherData, SearchEvent, WeatherLocation } from '../shared/types';
import { LocationService } from '../services/location.service';
import { StorageService } from '../services/storage.service';
import { CITY_NAME_LOCAL_STORAGE_KEY, COUNTRY_NAME_LOCAL_STORAGE_KEY, SELECTED_VOICE_LOCAL_STORAGE_KEY } from '../shared/const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LocationService]
})
export class HomeComponent implements OnInit {
  today = new Date();
  todayText = this.getTodayText();
  searchCityName = ``;
  locationName = ``;
  description = ``;
  currentTemp = 0;
  feelsLikeTemp = 0;
  minTemp = 0;
  maxTemp = 0;
  timeWeatherDataRetrieved = ``;
  windSpeed = 0;
  humidity = 0;
  sunriseTime = ``;
  sunsetTime = ``;
  locationToSearch = ``;
  locationLatitude = 0;
  locationLongitude = 0;
  loading = false;
  errorOccurred = false;
  errorMessage = '';
  searchingForLocation = false;
  weatherLocation: WeatherLocation | undefined;
  SpeechSynthesis = speechSynthesis;
  selectedVoice: number | null = null;
  weatherForecastData: ForecastWeatherData[] = [];

  constructor (private weatherService: WeatherService, private locationService: LocationService, private storageService: StorageService) {}
  
  ngOnInit(): void {
    this.startLoadingIndicator();
    const storedCityName = this.storageService.getItemFromLocalStorage(CITY_NAME_LOCAL_STORAGE_KEY);
    const storedCountryName = this.storageService.getItemFromLocalStorage(COUNTRY_NAME_LOCAL_STORAGE_KEY);
    if (storedCityName) {
      const location: SearchEvent = storedCountryName ? { city: storedCityName, country: storedCountryName } : { city: storedCityName };
      this.searchForLocation(location);
    } else {
      this.locationService.getCurrentLocation().then((geolocationPosition) => {
        if (geolocationPosition) {
          const { coords } = geolocationPosition;
          const { latitude, longitude } = coords;
          this.weatherLocation = { latitude, longitude };
        }
        this.getWeatherDataForToday();
        this.getWeatherForcastData();
      })
      .catch((error: any) => {
        console.error(error);
      });
    }
    this.setSelectedVoice();
  }
  
  refresh() {
    this.getWeatherDataForToday();
    this.getWeatherForcastData();
  }

  setSelectedVoice() {
    let selectedVoiceFromLocalStorage = this.storageService.getItemFromLocalStorage(SELECTED_VOICE_LOCAL_STORAGE_KEY);
    let selectedVoiceNumber = selectedVoiceFromLocalStorage ? parseInt(selectedVoiceFromLocalStorage) : null;
    if (selectedVoiceNumber) this.selectedVoice = selectedVoiceNumber;
  }

  getWeatherDataForToday(location: WeatherLocation | undefined = this.weatherLocation) {
    this.startLoadingIndicator();
    this.weatherService.getWeatherForToday(location).subscribe({
      next: (weatherData: any) => {
        this.associateWeatherDataToVariables(weatherData);
      },
      error: (error: any) => {
        this.logError(`weatherService.getWeatherForToday() Error:`, error);
      },
      complete: () => {
        this.timeWeatherDataRetrieved = retrieveTimeForDateWithSeconds();
      }
    });
  }
  
  getWeatherForcastData(location: WeatherLocation | undefined = this.weatherLocation) {
    this.startLoadingIndicator();
    this.weatherService.getWeatherForecastData(location).subscribe({
      next: (weatherData: any) => {
        const weatherForecastData = weatherData.list;
        this.associateWeatherForecastDataToVariables(weatherForecastData);
      },
      error: (error: any) => {
        this.logError(`weatherService.getWeatherForecastData() Error:`, error);
      }
    });
  }

  getTodayText(): string {
    return `${getDayText(this.today.getDay())}, ${this.today.getDate()} ${getMonthText(this.today.getMonth())} ${this.today.getFullYear()}`;
  }
  
  getDateText(date: Date): string {
    return `${getDayText(date.getDay())}, ${date.getDate()} ${getMonthText(date.getMonth())} ${date.getFullYear()}`;
  }

  associateWeatherDataToVariables(weatherData: any) {
    this.locationName = weatherData.name;
    this.description = weatherData.weather[0].description;
    this.currentTemp = Math.round(weatherData.main.temp);
    this.feelsLikeTemp = Math.round(weatherData.main.feels_like);
    this.minTemp = Math.round(weatherData.main.temp_min);
    this.maxTemp = Math.round(weatherData.main.temp_max);
    this.windSpeed = Math.round(weatherData.wind.speed);
    this.humidity = weatherData.main.humidity;
    const sunriseDateWithTime = createDateFromUnixTimestamp(weatherData.sys.sunrise);
    const sunsetDateWithTime = createDateFromUnixTimestamp(weatherData.sys.sunset);
    this.sunriseTime = retrieveTimeForDate(sunriseDateWithTime);
    this.sunsetTime = retrieveTimeForDate(sunsetDateWithTime);
    this.stopAllLoadingIndicators();
  }
  
  associateWeatherForecastDataToVariables(weatherForecastData: any) {
    this.weatherForecastData = weatherForecastData.map((weatherData: any) => {
      const weatherDataDate = new Date(weatherData.dt_txt);
      return {
        dateText: this.getDateText(weatherDataDate),
        description: weatherData.weather[0].description,
        temp: Math.round(weatherData.main.temp),
        minTemp: Math.round(weatherData.main.temp_min),
        maxTemp: Math.round(weatherData.main.temp_max),
        time: retrieveTimeForDate(weatherDataDate)
      }
    });
    this.stopAllLoadingIndicators();
  }

  searchForLocation(location: SearchEvent) {
    this.startSearchingForLocationLoadingIndicator();
    this.weatherService.getLocation(location.city, location.country).subscribe({
      next: (locationData: any) => {
        if (locationData.length === 0) {
          this.logError('', new Error(`Location: ${location} not found!`));
          return;
        }
        this.searchCityName = location.city;
        this.locationLatitude = locationData[0].lat;
        this.locationLongitude = locationData[0].lon;
        this.weatherLocation = { latitude: this.locationLatitude, longitude: this.locationLongitude };
        this.storageService.storeItemInLocalStorage(CITY_NAME_LOCAL_STORAGE_KEY, location.city);
        if (location.country) this.storageService.storeItemInLocalStorage(COUNTRY_NAME_LOCAL_STORAGE_KEY, location.country);
        this.getWeatherDataForToday();
        this.getWeatherForcastData();
      },
      error: (error: any) => {
        this.logError(`weatherService.searchForLocation(${location}) Error:`, error);
      }
    });
  }

  startLoadingIndicator() {
    this.loading = true;
  }
  
  stopLoadingIndicator() {
    this.loading = false;
  }
  
  startSearchingForLocationLoadingIndicator() {
    this.searchingForLocation = true;
  }
  
  stopSearchingForLocationLoadingIndicator() {
    this.searchingForLocation = false;
  }

  stopAllLoadingIndicators() {
    this.stopLoadingIndicator();
    this.stopSearchingForLocationLoadingIndicator();
  }

  logError(message: string, error: any) {
    this.stopAllLoadingIndicators();
    console.error(message, error);
    this.errorOccurred = true;
    this.errorMessage = `${message} ${error.message}`;
  }

  speakWeather() {
    const weatherForToday = new SpeechSynthesisUtterance(this.buildWeatherForTodayText());
    const voice: SpeechSynthesisVoice | null = this.selectedVoice ? this.SpeechSynthesis.getVoices()[this.selectedVoice] : null;
    weatherForToday.voice = voice;
    this.SpeechSynthesis.speak(weatherForToday);
  }

  buildWeatherForTodayText(): string {
    let weatherForTodayText = `Hi there, for today in ${this.locationName} you can expect ${this.description} with a current temperature of ${this.currentTemp}ºC.
    A high of ${this.maxTemp} and a low of ${this.minTemp}ºC`;
    return weatherForTodayText;
  }

  getLocationName(): string {
    let locationName = this.locationName;
    const citySearchNameAndLocationNameAreNotEqual = this.searchCityName.toLowerCase() !== this.locationName.toLowerCase();
    if (this.searchCityName && citySearchNameAndLocationNameAreNotEqual) locationName = `${this.searchCityName} - ${this.locationName}`;
    return locationName;
  }
}
