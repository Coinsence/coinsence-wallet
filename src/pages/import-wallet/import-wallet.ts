import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams, ViewController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { WalletProvider } from '../../providers/wallet/wallet';


@IonicPage()
@Component({
  selector: 'page-import-wallet',
  templateUrl: 'import-wallet.html',
})
export class ImportWalletPage {

  public privateKey: string = "";

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    private etherProvider: EtherProvider,
    private walletProvider: WalletProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImportWalletPage');
  }

  public importWallet() {
    let wallet = this.walletProvider.importWalletFromKey(this.privateKey);
    let provider = this.etherProvider.get();
    let signer = this.walletProvider.getSigner(wallet, provider);

    localStorage.setItem("isWallet", "true");
    localStorage.setItem("wallet", JSON.stringify(signer));

    this.viewController.dismiss();
    this.appCtrl.getRootNav().push('TabsPage');
  }

}
