import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { TokenProvider } from '../../providers/token/token';
import { EtherscanProvider } from '../../providers/etherscan/etherscan';
import { WalletProvider } from "../../providers/wallet/wallet";
import * as ColorHash from 'color-hash/dist/color-hash.js'

@IonicPage()
@Component({
  selector: 'page-token-details',
  templateUrl: 'token-details.html',
})
export class TokenDetailsPage {

  public walletAddress: string;
  public token: {
    contractAddress: string,
    name: string,
    symbol: string,
    decimals: number
  };

  public tokenBalance: number;
  public wallet: any;
  public txs: any;
  public page: number = 1;
  public limit: number = 10;

  private colorHash;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public etherProvider: EtherProvider,
    public tokenProvider: TokenProvider,
    public etherscanProvider: EtherscanProvider,
    public walletProvider: WalletProvider
  ) {
    this.token = this.navParams.get('token');

    this.wallet = JSON.parse(localStorage.getItem("wallet"));
    this.init();

    this.colorHash = new ColorHash();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter TokenDetailsPage');
  }

  init() {
    this.walletAddress = this.wallet.signingKey.address;
    this.loadBalance();
    this.getTokenTransactions();
  }

  private async loadBalance() {
    let tokenBalance = await this.tokenProvider.getBalance(this.wallet.signingKey.address, this.token.contractAddress, this.etherProvider.get());
    this.tokenBalance = parseInt(tokenBalance) / 10**this.token.decimals;
  }

  private async getTokenTransactions() {
    let tokenTxsLog = await this.etherscanProvider.getContractTokenTransfer(this.wallet.signingKey.address, this.token.contractAddress, this.page, this.limit);
    this.txs = tokenTxsLog.result;
    console.log(this.txs);
  }

  doInfinite(infiniteScroll) {
    console.log("scroll down worked!");
    setTimeout(() => {
      this.limit += 10;
      this.getTokenTransactions();
      infiniteScroll.complete();
    }, 500);
  }

  showDetail(tx: any) {
    let txDetailModal = this.modalCtrl.create('TransactionDetailPage', { tx: tx });
    txDetailModal.onDidDismiss(() => {
      this.limit = 10;
      this.getTokenTransactions();
    });
    txDetailModal.present();
  }

  symbolBgColor(str: string) {

    return this.colorHash.hex(str);
  }

  public divideBalance(balance: string, decimals: string): number {
    return parseInt(balance) / 10**parseInt(decimals);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(async() => {
      await this.init();

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
