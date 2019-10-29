import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { WalletProvider } from '../../providers/wallet/wallet';
import { TokenProvider } from '../../providers/token/token';

@IonicPage()
@Component({
  selector: 'page-token-send',
  templateUrl: 'token-send.html',
})
export class TokenSendPage {

  public token: {
    contractAddress: string,
    name: string,
    symbol: string,
    decimals: number
  };
  public tokenBalance: number;
  public wallet: any;
  public to: string;
  public value: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private modalController: ModalController,
    public etherProvider: EtherProvider,
    public walletProvider: WalletProvider,
    public tokenProvider: TokenProvider
  ) {
    this.token = this.navParams.get('token');
    this.tokenBalance = this.navParams.get('tokenBalance');
    this.wallet = this.navParams.get('wallet');

    this.value = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TokenSendPage');
  }

  /**
   * open qr-scanner modal
   */
  scanOnclick(e) {
    e.preventDefault();

    let scanQrModal = this.modalController.create('ScanQrPage');
    scanQrModal.onDidDismiss(ethAddress => {
      if(ethAddress != undefined) {
        //get ethereum address
        const address = ethAddress.split(":").pop();

        // check if address is valid
        if(this.walletProvider.checkAddress(address)) {
          this.to = address;
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

  /**
   * show denied permission toast
   * @param message toast message to show
   */
  permissionDeniedToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'buttom',
      cssClass: 'danger',
    });

    toast.present();
  }

  public send() {
    this.tokenProvider.sendToken(this.token.contractAddress, this.token.decimals, this.etherProvider.get(), this.wallet.signingKey.privateKey, this.to, this.value).then((tx) => {
      console.log(tx);
      this.cancel();
    });
  }

  public cancel() {
    this.navCtrl.pop();
  }

}
