


import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastController } from '@ionic/angular';
import { WeatherService } from 'src/app/services/weather';
import { City } from 'src/app/models/City';
import { CityService } from 'src/app/services/city';
import { Store } from '@ngrx/store';
import { WeatherActions } from 'src/app/store/weather/weather.actions';
import { selectWeatherData } from 'src/app/store/weather/weather.selector';
import { take } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'weather-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class WeatherHomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  public selectedCity: City = {} as City;
  public filteredCities!: City[];
  private allCities: City[] = [];

  // private store = inject(Store); -- alternate way to inject store
  public weather$ = this.store.select(selectWeatherData);

  constructor(
    public weatherService: WeatherService,
    private cityService: CityService,
    private toastCtrl: ToastController,
    private store: Store,
    private storage: Storage
  ) {

  }

  loadWeather() {
    this.store.select(selectWeatherData).pipe(take(1)).subscribe(async weather => {
      if (!weather) {
        const cached = await this.storage.get('lastCity');
        if (cached) {
          let city: City = structuredClone(cached ? JSON.parse(cached) : null);
          this.store.dispatch(WeatherActions.loadWeather({ lat: city?.coord.lat, lon: city?.coord.lon }));
        }
      }
    });
  }

  async ngOnInit() {
    await this.storage.create();
    this.loadWeather();

    this.cityService.getCities()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cities => {
        this.allCities = cities;
      });
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.filteredCities = this.filterCities(query);
  }

  private filterCities(value: string | null): City[] {
    const query = value?.toLowerCase() || '';
    if (!query || query?.length < 2) return [];

    return this.allCities
      .filter(c => c.name.toLowerCase().includes(query))
      .slice(0, 10);
  }


  selectCity(city: City) {
    this.selectedCity = city;
    this.filteredCities = [];
    this.searchCity();
  }

  searchCity() {
    const city = this.selectedCity;
    if (!city) return;
    this.storage.set('lastCity', JSON.stringify(city));
    // this.weather$ = this.weatherService.getWeatherByCoords(city.coord.lat, city.coord.lon);
    this.store.dispatch(WeatherActions.loadWeather({ lat: city.coord.lat, lon: city.coord.lon }));
  }

  async refresh(event: any) {
    if (!this.selectedCity) {
      event.target.complete();
      return;
    }

    //  this.weather$ = this.weatherService.getWeatherByCoords(this.selectedCity.coord.lat, this.selectedCity.coord.lon);
    this.store.dispatch(WeatherActions.loadWeather({ lat: this.selectedCity.coord.lat, lon: this.selectedCity.coord.lon }));
    setTimeout(async () => {
      await this.showToast('Weather updated!');
      event.target.complete();
    }, 1000);
  }

  private async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }
}
