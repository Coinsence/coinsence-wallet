import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
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
    public toastCtrl: ToastController,
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
      if(ethAddress != undefined) {
        const address = ethAddress.split(":").pop();

        if(this.walletProvider.checkAddress(address)) {
          const wallet = { signingKey: { address: address } };

          localStorage.setItem("wallet", JSON.stringify(wallet));
          localStorage.setItem("isWallet", "true");

          this.navCtrl.push('TabsPage');
        }
        else {
            this.permissionDeniedToast('Invalid address!');
        }
      }
      else {
        this.permissionDeniedToast('No address detected!');
      }
    })

    scanQrModal.present();
  }

  permissionDeniedToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'buttom',
      cssClass: 'danger',
    });

    toast.present();
  }

  createWalletModal() {
    let wallet = this.walletProvider.createWallet();
    localStorage.setItem("isWallet", "true");

    let createWalletModal = this.modalController.create('CreateWalletPage', { wallet: wallet }, { showBackdrop: false, enableBackdropDismiss: false});
    createWalletModal.present();
  }

}
