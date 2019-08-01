import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EtherscanProvider } from '../../providers/etherscan/etherscan';
import { WalletProvider } from '../../providers/wallet/wallet';
import * as ColorHash from 'color-hash/dist/color-hash.js'

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public walletAddress: string;
  public txs: any;
  public page: number = 1;
  public limit: number = 10;
  private colorHash;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private etherscanProvider: EtherscanProvider,
    public walletProvider: WalletProvider
  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HistoryPage');
    this.init();
    this.colorHash = new ColorHash();
  }

  init() {
    const wallet = JSON.parse(localStorage.getItem("wallet"));
    this.walletAddress = wallet.signingKey.address;
    this.loadTransactionsHistory();
  }

  async loadTransactionsHistory() {
    let tokenTxsLog = await this.etherscanProvider.getAllTokenTransfer(this.walletAddress, this.page, this.limit);
    this.txs = tokenTxsLog.result;
    console.log(this.txs);
  }

  showDetail(tx: any) {
    let txDetailModal = this.modalCtrl.create('TransactionDetailPage', { tx: tx });
    txDetailModal.onDidDismiss(() => {
      this.limit = 10;
      this.loadTransactionsHistory();
    });
    txDetailModal.present();
  }

  doInfinite(infiniteScroll) {
    console.log("scroll down worked!");
    setTimeout(() => {
      this.limit += 10;
      this.loadTransactionsHistory();
      infiniteScroll.complete();
    }, 500);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(async() => {
      this.limit = 10;
      this.loadTransactionsHistory();

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  symbolBgColor(str: string) {

    let color = this.colorHash.hex(str);

    return color;
  }

}
