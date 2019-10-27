import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { erc20Abi } from '../../utils/erc20-abi';
import { NotificationProvider } from '../notification/notification';

@Injectable()
export class TokenProvider {

  constructor(
    public notificationProvider: NotificationProvider
  ) {
    console.log('Hello TokenProvider Provider');
    console.log(erc20Abi);
  }

  public getInfo(contractAddress: string, provider: any) : Promise<any> {
    let tokenContract = new ethers.Contract(contractAddress, erc20Abi, provider);

    return new Promise(async (resolve, reject) => {
      let result = {
        name: "",
        symbol: "",
        decimals: 18
      };

      try {
        result.name = await tokenContract.name();
        result.symbol = await tokenContract.symbol();
        result.decimals = await tokenContract.decimals();

        resolve(result);
      }
      catch(e) {
        reject(e);
      }
    });
  }

  public getBalance(walletAddress: string, contractAddress: string, provider: any) : Promise<any> {
    let tokenContract = new ethers.Contract(contractAddress, erc20Abi, provider);

    return new Promise((resolve, reject) => {
      tokenContract.balanceOf(walletAddress).then((res) => {
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  /**
   * Function to set listener on default tokens contracts
   * @param address wallet address
   * @param tokens Array of token object
   * @param provider ether provider
   */
  public setTokenListener(
    address: string,
    token: any,
    provider: any
  ) {
    let contract =  new ethers.Contract(token.contractAddress, erc20Abi, provider);
    //filter for Transfer event only
    let filter = contract.filters.Transfer(null, address);

    //check that there is no already a listener on that contract event
    contract.on(filter, (from, to, value) => {
      let text = `Received ${this.divideBalance(value, token.decimals).toString()} \n${token.name} from \n${from}`;
      let data = '';
      this.notificationProvider.scheduleNotification(text, data);
    });

  }

  public divideBalance(balance: string, decimals: string): number {
    return parseInt(balance) / 10**parseInt(decimals);
  }

}
