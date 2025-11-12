import { Component, Input, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/Weather';

@Component({
  selector: 'weather-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class WeatherCardComponent implements OnInit {

  @Input() weather!: Weather | null;

  constructor() { }

  ngOnInit() { }

}
