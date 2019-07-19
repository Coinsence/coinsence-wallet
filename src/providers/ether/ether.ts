import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable()
export class EtherProvider {

  public etherProvider: any;

  constructor() {
    console.log('Hello EtherProvider Provider');
    this.detectNetwork();
  }

  public detectNetwork(){
    console.log("Start detecting network");

    let network = localStorage.getItem("network");
    switch(network) {
      case "mainnet": {
        this.etherProvider = ethers.getDefaultProvider('homestead');
        break;
      }
      case "rinkeby": {
        this.etherProvider = ethers.getDefaultProvider('rinkeby');
        break;
      }
      default: {
        this.etherProvider = ethers.getDefaultProvider('rinkeby');
        break;
      }
    }
  }

  public get() {
    console.log(this.etherProvider);
    return this.etherProvider;
  }
}
