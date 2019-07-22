import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { TokenProvider } from '../../providers/token/token';
import { BlockscoutProvider } from '../../providers/blockscout/blockscout';

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
  public tokensBalances: Array<number> = [];

  constructor(
    public navCtrl: NavController,
    public modalController: ModalController,
    private etherProvider: EtherProvider,
    private tokenProvider: TokenProvider,
    private blockscoutProvider: BlockscoutProvider
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');

    this.getProvider();
    this.loadWallet();
    this.loadTokens();
  }

  private getProvider() {
    this.provider = this.etherProvider.get();
  }

  private loadWallet() {
    this.wallet = JSON.parse(localStorage.getItem('wallet'));
  }

  private async loadTokens() {
    this.tokens = JSON.parse(localStorage.getItem("defaultTokens"));
    await this.loadTokensBalances();
  }

  private async loadTokensBalances() {
    console.log(this.tokens);
    this.tokensBalances = [];
    for(let i=0; i<this.tokens.length; i++) {
      let tokenBalance = await this.tokenProvider.getBalance(this.wallet.signingKey.address, this.tokens[i].contractAddress, this.provider);
      this.tokensBalances.push(tokenBalance);
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
    scanQrModal.onWillDismiss(async(ethAddress) => {
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
          alert(tokenInfo.message);
        }
      }
      else {
        alert("No address detected!");
      }
    })
    scanQrModal.present();
  }

  addTokenModal(fab: any) {
    fab.close();

    let createWalletModal = this.modalController.create('AddTokenPage', { defaultTokens: this.tokens }, { showBackdrop: false, enableBackdropDismiss: false});
    createWalletModal.onWillDismiss(async() => {
      await this.loadTokens();
    });
    createWalletModal.present();
  }

}
