import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { EtherProvider } from '../../providers/ether/ether';
import { TokenProvider } from '../../providers/token/token';

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
    public etherProvider: EtherProvider,
    public tokenProvider: TokenProvider
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
      this.tokenProvider.getInfo($event.target.value, this.etherProvider.get()).then((tokenInfo) => {
        console.log(tokenInfo);

        this.isValidTokenContract = true;

        //update default tokens item
        this.token.contractAddress = $event.target.value,
        this.token.decimals = tokenInfo.decimals,
        this.token.name = tokenInfo.name,
        this.token.symbol = tokenInfo.symbol,
        this.token.exist = true
      }, (err) => {
        console.log(err);
        alert("Error");
      });

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
