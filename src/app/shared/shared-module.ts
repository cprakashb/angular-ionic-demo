import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [WeatherCardComponent],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    IonicModule,
    FormsModule,
    CommonModule,
    WeatherCardComponent]
})
export class SharedModule { }
