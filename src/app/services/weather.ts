import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Weather } from '../models/Weather';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = '5ad4381d61eb7fc92e9782fde69b70fc';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  getWeatherByCoords(lat: number, lon: number) {
    console.log('Fetching weather for coords:', lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      map((data: any) => ({
        city: data.name,
        temp: Math.round(data.main.temp),
        desc: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        humidity: data.main.humidity,
        wind: data.wind.speed
      })),
      catchError(error => {
        console.error('Error fetching weather data', error);
        return of(null);
      })
    );
  }
}
