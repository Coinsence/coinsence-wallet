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

  /**
   * Function to set listener on default tokens contracts
   * @param address wallet address
   * @param tokens Array of token object
   * @param provider ether provider
   */
  public setTokenListener(
    address: string,
    tokens: Array<{
      contractAddress: string,
      name: string,
      symbol: string,
      decimals: number
    }>,
    provider: any
  ) {
    for(let i=0; i<tokens.length; i++) {
      //test notification
      this.notificationProvider.scheduleNotification('token test notification', 'test');

      let contract =  new ethers.Contract(tokens[i].contractAddress, erc20Abi, provider);
      console.log(contract);
      //filter for Transfer event only
      let filter = contract.filters.Transfer(null, address);

      //check that there is no already a listener on that contract event
      if(contract.listenerCount() == 0) {
        contract.on(filter, (from, to, value) => {
          console.log('I received ' + value.toString() + ' tokens from ' + from);
          let text = `Received ${value.toString} ${tokens[i].name} from ${from}`;
          let data = 'test';
          this.notificationProvider.scheduleNotification(text, data);
        });
      }
    }
  }

}
