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

  public privateKey: string = "0x2f27f97b8406cfa3e44be2fb0ab41117b14a41bcd16ccb684e402815e34897bf";

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
    console.log(signer);

    localStorage.setItem("isWallet", "true");
    localStorage.setItem("wallet", JSON.stringify(signer));

    this.viewController.dismiss();
    this.appCtrl.getRootNav().push('TabsPage');
  }

}
