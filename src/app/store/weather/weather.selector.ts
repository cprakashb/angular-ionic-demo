import { createSelector, createFeatureSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectWeatherData = createSelector(selectWeatherState, s => s.data);
export const selectWeatherLoading = createSelector(selectWeatherState, s => s.loading);
export const selectWeatherError = createSelector(selectWeatherState, s => s.error);
