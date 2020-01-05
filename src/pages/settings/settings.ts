import { Component } from '@angular/core';
import { IonicPage, App, ModalController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
//default tokens list
import { defaultTokens } from '../../utils/default-tokens';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  // wallet object
  public wallet: any;
  // ether.js provider
  private provider: any;
  public etherBalance: number;

  constructor(
    public appCtrl: App,
    public modalController: ModalController,
    private etherProvider: EtherProvider
  ) {
    this.loadWallet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');

    this.getProvider();
    this.getEtherBalance();
  }

  /**
   * load wallet from localstorage
   */
  private loadWallet() {
    this.wallet = JSON.parse(localStorage.getItem('wallet'));
  }

  public aboutModal() {
    let aboutUsModal = this.modalController.create('AboutUsPage');
    aboutUsModal.present();
  }

  public privacyPolicyModal() {
    let privacyPolicyModal = this.modalController.create('PrivacyPolicyPage');
    privacyPolicyModal.present();
  }

  public logout() {
    //reset data
    localStorage.setItem("isWallet", "false");
    localStorage.setItem("wallet", "");
    localStorage.setItem("defaultTokens", JSON.stringify(defaultTokens));

    this.appCtrl.getRootNav().setRoot('LoginPage');
  }

  /**
   * get ether.js provider
   */
  private getProvider() {
    this.provider = this.etherProvider.get();
  }

  /**
   * get ETH balance
   */
  private async getEtherBalance() {
    let weiBalance = await this.provider.getBalance(this.wallet.signingKey.address);
    this.etherBalance = parseFloat(this.etherProvider.weiToEther(weiBalance));
    console.log(this.etherBalance);
  }

}
