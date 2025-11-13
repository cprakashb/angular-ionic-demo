import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements ViewWillEnter {

  constructor() { }

  ionViewWillEnter(): void {
    console.log('Tab1Page will enter');
  }

}
