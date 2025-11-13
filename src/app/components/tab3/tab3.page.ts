import { Component, inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { City } from 'src/app/models/City';
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

  constructor(public navctrl: NavController, private storage: Storage) { }

  ngOnInit() {
    this.store.select(selectWeatherData).pipe(take(1)).subscribe(async weather => {
      if (!weather) {
        await this.storage.create();
        const cached = await this.storage.get('lastCity');
        if (cached) {
          let city: City = structuredClone(cached ? JSON.parse(cached) : null);
          this.store.dispatch(WeatherActions.loadWeather({ lat: city?.coord.lat, lon: city?.coord.lon }));
        }
      }
    });
  }

  public navigateToTab1() {
    this.navctrl.navigateForward('/tabs/tab1'); // navigateByURl

    this.navctrl.navigateRoot('/tabs/tab1'); // removes all pages from stack
  }

}
