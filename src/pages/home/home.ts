import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public wallet: any;

  constructor(
    public navCtrl: NavController
  ) {
    this.wallet = JSON.parse(localStorage.getItem('wallet'));
    console.log(this.wallet);
  }
}
