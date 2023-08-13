import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  getCurrentLocation(): Promise<GeolocationPosition | undefined> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (location: GeolocationPosition) => {
            resolve(location);
          }, 
          (error: GeolocationPositionError) => {
            reject(`Error getting current location: ${error.code} - ${error.message}`);
          }, 
          this.options
        );
      }
    });
  }
}

