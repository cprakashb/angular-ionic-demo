import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { City } from 'src/app/models/City';
import { Weather } from 'src/app/models/Weather';
import { WeatherActions } from 'src/app/store/weather/weather.actions';
import { selectWeatherData, selectWeatherLoading } from 'src/app/store/weather/weather.selector';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  private store = inject(Store);
  weather$ = this.store.select(selectWeatherData);
  loading$ = this.store.select(selectWeatherLoading);

  constructor() { }

  ngOnInit() {
    this.store.select(selectWeatherData).pipe(take(1)).subscribe(weather => {
      if (!weather) {
        const cached = localStorage.getItem('lastCity');
        if (cached) {
          let city: City = structuredClone(cached ? JSON.parse(cached) : null);
          this.store.dispatch(WeatherActions.loadWeather({ lat: city?.coord.lat, lon: city?.coord.lon }));
        }
      }
    });
  }

}
