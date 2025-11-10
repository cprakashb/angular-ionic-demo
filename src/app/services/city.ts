import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { City } from '../models/City';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('assets/city.list.json').pipe(
      shareReplay(1) // cache in memory to avoid refetching
    );
  }
}
