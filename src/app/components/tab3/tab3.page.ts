import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherActions } from 'src/app/store/weather/weather.actions';
import { selectWeatherData, selectWeatherLoading } from 'src/app/store/weather/weather.selector';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  private store = inject(Store);
  weather$ = this.store.select(selectWeatherData);
  loading$ = this.store.select(selectWeatherLoading);
  constructor() { }

}
