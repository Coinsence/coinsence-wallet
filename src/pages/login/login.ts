import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalController: ModalController,
    private walletProvider: WalletProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  scanOnclick() {
    let scanQrModal = this.modalController.create('ScanQrPage');
    scanQrModal.onDidDismiss(ethAddress => {
      const address = ethAddress.split(":").pop();

      if(this.walletProvider.checkAddress(address)) {
        const wallet = { address: address };

        localStorage.setItem("wallet", JSON.stringify(wallet));
        localStorage.setItem("isWallet", "true");

        this.navCtrl.push('HomePage');
      }
      else {
        alert("Invalid address");
      }
    })
    scanQrModal.present();
  }

}
