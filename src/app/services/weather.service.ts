import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForToday(location?: { latitude: number, longitude: number }): Observable<any>  {
    return location ? 
      this.http.get(`/api/weather/today?latitude=${location.latitude}&longitude=${location.longitude}`)
      : this.http.get(`/api/weather/today`);
  }
  
  getWeatherForecastData(location?: { latitude: number, longitude: number }): Observable<any>  {
    return location ? 
      this.http.get(`/api/weather/forecast?latitude=${location.latitude}&longitude=${location.longitude}`)
      : this.http.get(`/api/weather/forecast`);
  }

  getLocation(cityName: string, countryCode?: string): Observable<any> {
    const locationQuery = countryCode ? `cityName=${cityName}&countryCode=${countryCode}` : `cityName=${cityName}`;
    return this.http.get(`/api/weather/location?${locationQuery}`);
  }
}
