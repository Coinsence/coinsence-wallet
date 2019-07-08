import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable()
export class EtherProvider {

  public etherProvider: any;

  constructor() {
    this.etherProvider = ethers.getDefaultProvider('rinkeby');
  }

  public get() {
    return this.etherProvider;
  }
}
