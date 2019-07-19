import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public etherProvider: EtherProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    let network = localStorage.setItem("network", "mainnet");

    this.etherProvider.detectNetwork();
  }

}
