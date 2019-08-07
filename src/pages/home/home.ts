import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { TokenProvider } from '../../providers/token/token';
import { BlockscoutProvider } from '../../providers/blockscout/blockscout';
import * as ColorHash from 'color-hash/dist/color-hash.js'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private provider: any;

  public wallet: any;
  public tokens: Array<{
    contractAddress: string,
    name: string,
    symbol: string,
    decimals: number
  }>;
  public tokensBalances: Array<string> = [];
  private colorHash;

  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    private alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private etherProvider: EtherProvider,
    private tokenProvider: TokenProvider,
    private blockscoutProvider: BlockscoutProvider
  ) {
  }

  ionViewCanEnter(): boolean{
    // here we can either return true or false
    // depending on if we want to leave this view
    if(localStorage.getItem("isWallet") == "true"){
       return true;
     } else {
       return false;
     }
   }


  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');

    this.getProvider();
    this.loadWallet();
    this.loadTokens();

    this.colorHash = new ColorHash();
  }

  private getProvider() {
    this.provider = this.etherProvider.get();
  }

  private loadWallet() {
    this.wallet = JSON.parse(localStorage.getItem('wallet'));
  }

  private async loadTokens() {
    this.tokens = JSON.parse(localStorage.getItem("defaultTokens"));
    console.log(this.tokens);
    await this.loadTokensBalances();
  }

  private async loadTokensBalances() {
    for(let i=0; i<this.tokens.length; i++) {
      let tokenBalance = await this.tokenProvider.getBalance(this.wallet.signingKey.address, this.tokens[i].contractAddress, this.provider);
      this.tokensBalances[i] = tokenBalance;
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(async() => {
      await this.loadTokens();

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  public scanOnclick(fab: any) {
    fab.close();

    let scanQrModal = this.modalController.create('ScanQrPage');
    scanQrModal.onDidDismiss(async(ethAddress) => {
      if(ethAddress != undefined) {
        //get contract address
        const tokenAddress = ethAddress.split(":").pop();

        //get token info
        let tokenInfo = await this.blockscoutProvider.getTokenInfo(tokenAddress);

        if(tokenInfo.status != "0") {
          //update default tokens item
          let token = {
            contractAddress: tokenInfo.result.contractAddress,
            decimals: tokenInfo.result.decimals,
            name: tokenInfo.result.name,
            symbol: tokenInfo.result.symbol
          };
          this.tokens.push(token);
          localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

          await this.loadTokens();
        }
        else {
          this.permissionDeniedToast(tokenInfo.message);
        }
      }
      else {
        this.permissionDeniedToast("No address detected!")
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

  addTokenModal(fab: any) {
    fab.close();

    let createWalletModal = this.modalController.create('AddTokenPage', { defaultTokens: this.tokens }, { showBackdrop: false, enableBackdropDismiss: false});
    createWalletModal.onWillDismiss(async() => {
      await this.loadTokens();
    });
    createWalletModal.present();
  }

  public showRemoveAlert(e, tokenIndex: number) {
    e.preventDefault();
    e.stopPropagation();
    console.log("remove action triggered");

    let alert = this.alertCtrl.create({
      title: 'Confirm remove',
      message: 'Do you want to remove this token?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeToken(tokenIndex);
          }
        }
      ]
    });
    alert.present();
  }

  public async removeToken(tokenIndex: number) {
    this.tokens.splice(tokenIndex, 1);
    localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

    await this.loadTokens();
  }

  symbolBgColor(str: string) {

    let color = this.colorHash.hex(str);

    return color;
  }
}
