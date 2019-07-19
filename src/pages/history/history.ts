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
    this.walletAddress = "0x4D99d767477Fbb2B47EFeb17E2a78970AD22CCc1";
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

}
