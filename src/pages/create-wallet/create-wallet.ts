import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { WalletProvider } from '../../providers/wallet/wallet';

@IonicPage()
@Component({
  selector: 'page-create-wallet',
  templateUrl: 'create-wallet.html',
})
export class CreateWalletPage {

  public wallet: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    private etherProvider: EtherProvider,
    private walletProvider: WalletProvider
  ) {
    this.wallet = this.navParams.get('wallet');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateWalletPage');
  }

  public confirm() {
    const provider = this.etherProvider.get();
    const signer = this.walletProvider.getSigner(this.wallet, provider);
    localStorage.setItem("wallet", JSON.stringify(signer));

    this.viewController.dismiss();
  }

}
