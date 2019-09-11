import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { BlockscoutProvider } from '../../providers/blockscout/blockscout';

@IonicPage()
@Component({
  selector: 'page-add-token',
  templateUrl: 'add-token.html',
})
export class AddTokenPage {

  public tokens: Array<any>;
  public token = {
    contractAddress: "",
    decimals: "",
    name: "",
    symbol: "",
    exist: false
  };
  public isValidTokenContract: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private blockscoutProvider: BlockscoutProvider
  ) {
    this.tokens = this.navParams.get('defaultTokens');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTokenPage');
  }

  onContractInput($event) {
    let loading = this.loadingCtrl.create({
      content: 'Loading token info...'
    });
    loading.present();

    setTimeout(async() => {
      //get token info
      let tokenInfo = await this.blockscoutProvider.getTokenInfo($event.target.value);

      if(tokenInfo.status != "0") {
        this.isValidTokenContract = true;

        //update default tokens item
        this.token.contractAddress = tokenInfo.result.contractAddress,
        this.token.decimals = tokenInfo.result.decimals,
        this.token.name = tokenInfo.result.name,
        this.token.symbol = tokenInfo.result.symbol,
        this.token.exist = true
      }
      else {
        alert(tokenInfo.message);
      }

      loading.dismiss();
    }, 1000);
  }

  public addToken() {
    this.tokens.push(this.token);
    localStorage.setItem("defaultTokens", JSON.stringify(this.tokens));

    this.viewCtrl.dismiss(this.token);
  }

  public cancel() {
    this.viewCtrl.dismiss();
  }

}
