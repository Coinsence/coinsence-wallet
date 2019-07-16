import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { erc20Abi } from '../../utils/erc20-abi';

@Injectable()
export class TokenProvider {

  constructor(
  ) {
    console.log('Hello TokenProvider Provider');
    console.log(erc20Abi);
  }

  public getBalance(walletAddress: string, contractAddress: string, provider: any) : Promise<number> {
    let tokenContract = new ethers.Contract(contractAddress, erc20Abi, provider);

    return new Promise((resolve, reject) => {
      tokenContract.balanceOf(walletAddress).then((res) => {
        resolve(res.toNumber());
      }, (err) => {
        reject(err);
      });
    });
  }

}
