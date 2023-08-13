# Weather App

This project is a weather app that provides current temperature data for your current physical location or another location you may search for, as well as a 3-hourly forecast for the next 5 days. It uses OpenWeather APIs to deliver the weather information. The app can announce the weather using JavaScript text to speech features, where you can choose your preferred voice on the settings page. The app also provides light and dark themes but defaults to your system's theme.

## Development server

To run the development server you'll first need to ensure that you have a .env (environment file) with the following vital keys OPEN_WEATHER_MAP_API_KEY, DEFAULT_LOCATION_LATITUDE, DEFAULT_LOCATION_LONGITUDE. Then you'll run the dev server by running `npm run proxy:server` and `ng s` at the same time, in different terminal windows if possible.

## Building and running

To build and run this app on your machine you'll need to ensure that you have a .env (environment file) with the following vital keys OPEN_WEATHER_MAP_API_KEY, DEFAULT_LOCATION_LATITUDE, DEFAULT_LOCATION_LONGITUDE. Then you'll run the app by running `npm run start:dev` or `npm run start:prod`, each command just uses a different port.

## Building and running in Docker

To build and run this app on in docker you'll need to ensure that you have a .env (environment file) with the following vital keys OPEN_WEATHER_MAP_API_KEY, DEFAULT_LOCATION_LATITUDE, DEFAULT_LOCATION_LONGITUDE. Then you'll run the app by running `npm run doc:build` then you will run `npm run doc:run:dev` to run the Docker image locally.
