


import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map, Observable, of, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastController } from '@ionic/angular';
import { WeatherService } from 'src/app/services/weather';
import { Weather } from 'src/app/models/Weather';
import { City } from 'src/app/models/City';
import { CityService } from 'src/app/services/city';

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

  public weather$!: Observable<Weather | null>;

  constructor(
    public weatherService: WeatherService,
    private cityService: CityService,
    private toastCtrl: ToastController
  ) {

  }

  ngOnInit() {
    const cached = localStorage.getItem('lastCity');
    if (cached) {
      this.selectedCity = structuredClone(cached ? JSON.parse(cached) : null);
      this.searchCity();
    }

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
    localStorage.setItem('lastCity', JSON.stringify(city));
    this.weather$ = this.weatherService.getWeatherByCoords(city.coord.lat, city.coord.lon);
  }

  async refresh(event: any) {
    if (!this.selectedCity) {
      event.target.complete();
      return;
    }
    this.weather$ = this.weatherService.getWeatherByCoords(this.selectedCity.coord.lat, this.selectedCity.coord.lon);
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
