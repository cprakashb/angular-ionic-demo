import { createActionGroup, props } from '@ngrx/store';
import { Weather } from 'src/app/models/Weather';

export const WeatherActions = createActionGroup({
  source: 'Weather',
  events: {
    'Load Weather': props<{ lat: number, lon: number }>(),
    'Load Weather Success': props<{ weather: Weather | null }>(),
    'Load Weather Failure': props<{ error: any }>(),
  },
});
