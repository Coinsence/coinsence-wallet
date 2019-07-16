import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { TokenProvider } from '../../providers/token/token';

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
    private etherProvider: EtherProvider,
    private tokenProvider: TokenProvider
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
    for(let i=0; i<this.tokens.length; i++) {
      this.tokenProvider.getBalance(this.wallet.signingKey.address, this.tokens[i].contractAddress, this.provider).then(tokenBalance => {
        this.tokensBalances.push(tokenBalance);
      });
    }
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(async() => {
      await this.loadTokensBalances();

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
