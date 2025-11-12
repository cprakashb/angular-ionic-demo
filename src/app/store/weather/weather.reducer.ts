import { createReducer, on } from '@ngrx/store';
import { WeatherActions } from './weather.actions';
import { Weather } from 'src/app/models/Weather';

export interface WeatherState {
  data: Weather | null;
  loading: boolean;
  error: any;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather, state => ({ ...state, loading: true })),
  on(WeatherActions.loadWeatherSuccess, (state, { weather }) => ({
    ...state,
    data: weather,
    loading: false,
  })),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
