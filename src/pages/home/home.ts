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

  // ether.js provider
  private provider: any;

  // wallet object
  public wallet: any;
  // list of tokens
  public tokens: Array<{
    contractAddress: string,
    name: string,
    symbol: string,
    decimals: number
  }>;
  // list of tokens balances
  public tokensBalances: Array<number> = [];
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
    // can only enter this view if there is an existant wallet in localstorage
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

  /**
   * get ether.js provider
   */
  private getProvider() {
    this.provider = this.etherProvider.get();
  }

  /**
   * load wallet from localstorage
   */
  private loadWallet() {
    this.wallet = JSON.parse(localStorage.getItem('wallet'));
  }

  /**
   * get list of tokens and load balances
   */
  private async loadTokens() {
    this.tokens = JSON.parse(localStorage.getItem("defaultTokens"));

    let addressTokensList = await this.blockscoutProvider.getTokensList(this.wallet.signingKey.address);
    addressTokensList.result.forEach(addressToken => {
      if((addressToken.type == "ERC-20") && (addressToken.contractAddress != "0xb705b833b2A6413e778c45A4499EE1c048875BF5")) {
        let token = {
          contractAddress: addressToken.contractAddress,
          decimals: parseInt(addressToken.decimals),
          name: addressToken.name,
          symbol: addressToken.symbol
        };
        this.tokens.push(token);
      }
    });
    localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

    await this.loadTokensBalances();
  }

  private async loadTokensBalances() {
    for(let i=0; i<this.tokens.length; i++) {
      let tokenBalance = await this.tokenProvider.getBalance(this.wallet.signingKey.address, this.tokens[i].contractAddress, this.provider);
      //this code solve the progblem of the CCC token decimals=0
      if(this.tokens[i].contractAddress != "0xb705b833b2A6413e778c45A4499EE1c048875BF5") {
        this.tokensBalances[i] = parseInt(tokenBalance) / 10**this.tokens[i].decimals;
      }
      else {
        this.tokensBalances[i] = tokenBalance;
      }
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

  /**
   * qr-scanner modal
   * @param fab any
   */
  public scanOnclick(fab: any) {
    fab.close();

    let scanQrModal = this.modalController.create('ScanQrPage');
    scanQrModal.onDidDismiss(async(ethAddress) => {
      if(ethAddress != undefined) {
        //get contract address
        const tokenAddress = ethAddress.split(":").pop();

        //get token info
        let tokenInfo = await this.blockscoutProvider.getTokenInfo(tokenAddress);

        // if token address exist
        if(tokenInfo.status != "0") {
          //update default tokens item
          let token = {
            contractAddress: tokenInfo.result.contractAddress,
            decimals: tokenInfo.result.decimals,
            name: tokenInfo.result.name,
            symbol: tokenInfo.result.symbol
          };
          // add token to tokens list
          this.tokens.push(token);
          // save tokens list into localstorage
          localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

          // load tokens
          await this.loadTokens();

          //Create event listener for added token
          this.tokenProvider.setTokenListener(this.wallet.signingKey.address, token, this.provider);
        }
        else {
          this.permissionDeniedToast(tokenInfo.message);
        }
      }
      else {
        this.permissionDeniedToast("No address detected!");
      }
    })
    scanQrModal.present();
  }

  /**
   * show permission denied toast
   * @param message toast message
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

  /**
   * add token
   * @param fab any
   */
  addTokenModal(fab: any) {
    fab.close();

    // open add token modal
    let createWalletModal = this.modalController.create('AddTokenPage', { defaultTokens: this.tokens }, { showBackdrop: false, enableBackdropDismiss: false});
    createWalletModal.onDidDismiss(async(addedToken) => {
      await this.loadTokens();

      if(addedToken != undefined) {
        //Create event listener for added token
        this.tokenProvider.setTokenListener(this.wallet.signingKey.address, addedToken, this.provider);
      }
    });
    createWalletModal.present();
  }

  /**
   * show remove alert
   * @param e event
   * @param tokenIndex token index in tokens list
   */
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

  /**
   * remove token
   * @param tokenIndex token index in tokens list
   */
  public async removeToken(tokenIndex: number) {
    this.tokens.splice(tokenIndex, 1);
    this.tokensBalances.splice(tokenIndex, 1);
    localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

    await this.loadTokens();
  }

  symbolBgColor(str: string) {

    let color = this.colorHash.hex(str);

    return color;
  }
}
