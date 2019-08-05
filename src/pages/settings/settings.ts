import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ModalController } from 'ionic-angular';
//default tokens list
import { defaultTokens } from '../../utils/default-tokens';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalController: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  public aboutModal() {
    let aboutUsModal = this.modalController.create('AboutUsPage');
    aboutUsModal.present();
  }

  public logout() {
    //reset data
    localStorage.setItem("isWallet", "false");
    localStorage.setItem("wallet", "");
    localStorage.setItem("defaultTokens", JSON.stringify(defaultTokens));

    this.appCtrl.getRootNav().push('LoginPage');
  }

}
