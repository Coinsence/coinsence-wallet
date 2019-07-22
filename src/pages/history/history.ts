import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EtherscanProvider } from '../../providers/etherscan/etherscan';
import { WalletProvider } from '../../providers/wallet/wallet';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public walletAddress: string;
  public txs: any;

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
  }

  public async init() {
    const wallet = JSON.parse(localStorage.getItem("wallet"));
    this.walletAddress = wallet.signingKey.address;
    let tokenTxsLog = await this.etherscanProvider.getAllTokenTransfer(this.walletAddress);
    this.txs = tokenTxsLog.result;
    console.log(this.txs);
  }

  showDetail(tx: any) {
    let txDetailModal = this.modalCtrl.create('TransactionDetailPage', { tx: tx });
    txDetailModal.onDidDismiss(() => {
      this.init();
    });
    txDetailModal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(async() => {
      this.init();

      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
