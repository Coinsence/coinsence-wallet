import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { TokenProvider } from '../../providers/token/token';
import { EtherscanProvider } from '../../providers/etherscan/etherscan';

@IonicPage()
@Component({
  selector: 'page-token-details',
  templateUrl: 'token-details.html',
})
export class TokenDetailsPage {

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public etherProvider: EtherProvider,
    public tokenProvider: TokenProvider,
    public etherscanProvider: EtherscanProvider
  ) {
    this.token = this.navParams.get('token');
    this.wallet = this.navParams.get('wallet');

    this.init();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter TokenDetailsPage');
  }

  init() {
    console.log("init");
    this.wallet = JSON.parse(localStorage.getItem("wallet"));
    this.loadBalance()
    this.getTokenTransactions();
  }

  private async loadBalance() {
    let tokenBalance = await this.tokenProvider.getBalance(this.wallet.signingKey.address, this.token.contractAddress, this.etherProvider.get());
    //this code solve the progblem of the CCC token decimals=0
    if(this.token.contractAddress != "0xb705b833b2A6413e778c45A4499EE1c048875BF5") {
      this.tokenBalance = parseInt(tokenBalance) / 10**this.token.decimals;
    }
    else {
      this.tokenBalance = tokenBalance;
    }
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

  public sendTokenModal() {
    /*let sendModal = this.modalCtrl.create('TokenSendPage', { wallet: this.wallet, token: this.token, tokenBalance: this.tokenBalance });
    sendModal.onDidDismiss(() => {
      this.limit = 10;
      this.getTokenTransactions();
    });
    sendModal.present();*/

    this.navCtrl.push('TokenSendPage', { wallet: this.wallet, token: this.token, tokenBalance: this.tokenBalance });
  }

}
