import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-token',
  templateUrl: 'add-token.html',
})
export class AddTokenPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTokenPage');
  }

}
