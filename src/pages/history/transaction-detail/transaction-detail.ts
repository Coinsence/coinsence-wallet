import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html',
})
export class TransactionDetailPage {

  public tx: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.tx = this.navParams.get('tx');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransactionDetailPage');
  }

  public divideBalance(balance: string, decimals: string): number {
    return parseInt(balance) / 10**parseInt(decimals);
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

}
