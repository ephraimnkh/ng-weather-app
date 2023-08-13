export type WeatherLocation = { latitude: number, longitude: number };
export type Theme = 'Light' | 'Dark' | 'Default';
export type SearchType = 'city' | 'city_country';
export type SearchTypeDropdownText = 'City' | 'City & Country';
export type SearchEvent = { city: string, country?: string };
export type ForecastWeatherData = {
    dateText: string,
    description: string,
    temp: number,
    minTemp: number,
    maxTemp: number,
    time: string
}