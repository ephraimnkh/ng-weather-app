import { Request, Response, Express } from "express";
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as http from 'http';
import * as path from 'path';
import * as https from 'https';
import axios from 'axios';

dotenv.config();

// setup app
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiKey = process.env['OPEN_WEATHER_MAP_API_KEY'];

app.get('/api/weather/today', (req: Request, res: Response) => {
    const latitude = req.query['latitude'] || process.env['DEFAULT_LOCATION_LATITUDE'];
    const longitude = req.query['longitude'] || process.env['DEFAULT_LOCATION_LONGITUDE'];

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error: any) => {
        console.error(`Error fetching weather data for today:`, error);
    });
});

app.get('/api/weather/forecast', (req: Request, res: Response) => {
    const latitude = req.query['latitude'] || process.env['DEFAULT_LOCATION_LATITUDE'];
    const longitude = req.query['longitude'] || process.env['DEFAULT_LOCATION_LONGITUDE'];

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error: any) => {
        console.error(`Error fetching 5 days weather data:`, error);
    });
});

app.get('/api/weather/location', (req: Request, res: Response) => {
    const cityName = req.query['cityName'];
    const countryCode = req.query['countryCode'];
    const locationSearchQuery = countryCode ? `${cityName},,${countryCode}` : `${cityName}`;

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${locationSearchQuery}&appid=${apiKey}`)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error: any) => {
        console.error(`Error fetching location data:`, error);
    });
});

app.get('/api/country-codes', (req: Request, res: Response) => {
    axios.get(`https://datahub.io/core/country-list/r/data.json`)
    .then((response) => {
        res.json(response.data);
    })
    .catch((error: any) => {
        console.error(`Error fetching country code list:`, error);
    });
});

// Setup server to serve Angular app and allow routing within the app. Both below are needed.
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/*', express.static(path.join(__dirname, 'dist')));


const httpPort = process.env['HTTP_PORT'] || 8080;
const httpsPort = process.env['HTTPS_PORT'] || 8443;

const serverLogText = process.env['NODE_ENV'] === 'production' ? `Server running on http://localhost:${httpsPort}` : `Server running on http://localhost:${httpPort}`;

http.createServer(app).listen(httpPort, () => {
    console.log(serverLogText);
});

// setup https server if in production environment
if (process.env['NODE_ENV'] === 'production'){
    https.createServer({
        // key: fs.readFileSync('certs/),
        // cert: fs.readFileSync('certs/),
        // ca: fs.readFileSync('certs/')
    }, app).listen(httpsPort, () => {
        console.log(serverLogText);
    });
}