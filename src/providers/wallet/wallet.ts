import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable()
export class WalletProvider {

  constructor() {
    console.log('Hello WalletProvider Provider');
  }

  public createWallet() {
    return ethers.Wallet.createRandom();
  }

  public importWalletFromKey(privateKey: string) {
    return new ethers.Wallet(privateKey);
  }

  // not sure about this
  public watchWallet(address: string) {
    try {
      const walletAddress = ethers.utils.getAddress(address);
      return ({ address: walletAddress });
    } catch (e) {
      return ({});
    }
  }

  public getSigner(wallet: any, ethProvider: any) {
    const signer = wallet.connect(ethProvider);
    return signer;
  }

  public checkAddress(address: string) : boolean {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch (e) {
      return false;
    }
  }

  public checkSumAddress(address: string): string {
    return ethers.utils.getAddress(address);
  }

}
