import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//default tokens list
import { defaultTokens } from '../../utils/default-tokens';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  public aboutModal() {

  }

  public logout() {
    //reset data
    localStorage.setItem("isWallet", "false");
    localStorage.setItem("wallet", "");
    localStorage.setItem("defaultTokens", JSON.stringify(defaultTokens));

    this.navCtrl.push('LoginPage');
  }

}
