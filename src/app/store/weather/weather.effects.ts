import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherActions } from './weather.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { WeatherService } from 'src/app/services/weather';

@Injectable()
export class WeatherEffects {
  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      switchMap(({ lat, lon }) =>
        this.weatherService.getWeatherByCoords(lat, lon).pipe(
          map(weather => WeatherActions.loadWeatherSuccess({ weather })),
          catchError(error => of(WeatherActions.loadWeatherFailure({ error })))
        )
      )
    )
  );
}
