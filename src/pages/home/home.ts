import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { TokenProvider } from '../../providers/token/token';
import { EthplorerProvider } from '../../providers/ethplorer/ethplorer';
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
    mainnetAddress: string,
    rinkebyAddress: string,
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
    private ethplorerProvider: EthplorerProvider,
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
    if(this.provider.network.chainId == 1) {
      for(let i=0; i<this.tokens.length; i++) {
        if(this.tokens[i].mainnetAddress != null) {
          this.tokenProvider.getBalance(this.wallet.signingKey.address, this.tokens[i].mainnetAddress, this.provider).then(tokenBalance => {
            this.tokensBalances.push(tokenBalance);
          });
        }
        else {
          this.tokens.splice(i);
        }
      }
    }
    if(this.provider.network.chainId == 4) {
      for(let i=0; i<this.tokens.length; i++) {
        if(this.tokens[i].rinkebyAddress != null) {
          this.tokenProvider.getBalance(this.wallet.signingKey.address, this.tokens[i].rinkebyAddress, this.provider).then(tokenBalance => {
            this.tokensBalances.push(tokenBalance);
          });
        }
        else {
          this.tokens.splice(i);
        }
      }
    }

    console.log(this.tokens);
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
        let tokenInfo: any;
        if(this.provider.network.chainId == 1) {
          tokenInfo = await this.ethplorerProvider.getTokenInfo(tokenAddress);
          if(tokenInfo.status != "0") {
            let token = {
              mainnetAddress: tokenInfo.result.contractAddress,
              rinkebyAddress: null,
              decimals: tokenInfo.result.decimals,
              name: tokenInfo.result.name,
              symbol: tokenInfo.result.symbol
            };

            this.tokens.push(token);
            localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

            await this.loadTokensBalances();
          }
          else {
            alert(tokenInfo.message);
          }
        }
        else if (this.provider.network.chainId == 4) {
          tokenInfo = await this.blockscoutProvider.getTokenInfo(tokenAddress);
          if(tokenInfo.status != "0") {
            let token = {
              mainnetAddress: null,
              rinkebyAddress: tokenInfo.result.contractAddressull,
              decimals: tokenInfo.result.decimals,
              name: tokenInfo.result.name,
              symbol: tokenInfo.result.symbol
            };

            this.tokens.push(token);
            localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

            await this.loadTokensBalances();
          }
          else {
            alert(tokenInfo.message);
          }
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
    createWalletModal.onDidDismiss(async() => {
      await this.loadTokens();
    });
    createWalletModal.present();
  }

}
