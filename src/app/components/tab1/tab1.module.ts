import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { WeatherHomeComponent } from './weather/home/home.component';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    Tab1PageRoutingModule,
    SharedModule
  ],
  declarations: [Tab1Page, WeatherHomeComponent]
})
export class Tab1PageModule { }
