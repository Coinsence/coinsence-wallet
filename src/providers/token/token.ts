import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { erc20Abi } from '../../utils/erc20-abi';
import { NotificationProvider } from '../notification/notification';
import { WalletProvider } from '../wallet/wallet';

@Injectable()
export class TokenProvider {

  constructor(
    public notificationProvider: NotificationProvider,
    public walletProvider: WalletProvider
  ) {
    console.log('Hello TokenProvider Provider');
    console.log(erc20Abi);
  }

  public estimateTokentransfer(contractAddress: string, decimals: number, provider: any, pk: string, to: string, value: number): Promise<any> {
    let _wallet = this.walletProvider.importWalletFromKey(pk);
    let _signer = this.walletProvider.getSigner(_wallet, provider);

    let tokenContract = new ethers.Contract(contractAddress, erc20Abi, provider);
    let contractWithSigner = tokenContract.connect(_signer);

    return new Promise((resolve, reject) => {
      let amount = ethers.utils.parseUnits(value.toString(), decimals);
      console.log(amount);

      contractWithSigner.estimate.transfer(to, amount).then((res) => {
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  public sendToken(contractAddress: string, decimals: number, provider: any, pk: string, to: string, value: number) : Promise<any> {
    let _wallet = this.walletProvider.importWalletFromKey(pk);
    let _signer = this.walletProvider.getSigner(_wallet, provider);

    let tokenContract = new ethers.Contract(contractAddress, erc20Abi, provider);
    let contractWithSigner = tokenContract.connect(_signer);

    return new Promise((resolve, reject) => {
      let amount = ethers.utils.parseUnits(value.toString(), decimals);
      console.log(amount);

      contractWithSigner.transfer(to, amount).then((res) => {
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
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
        console.log(e);
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
    let filter = contract.filters.Transfer(null, null);

    //check that there is no already a listener on that contract event
    contract.on(filter, (from, to, value) => {
      if(from == address) {
        let text = `Sent ${this.divideBalance(value, token.decimals).toString()} \n${token.name} to \n${to}`;
        let data = '';
        this.notificationProvider.scheduleNotification(text, data);
      }
      if(to == address) {
        let text = `Received ${this.divideBalance(value, token.decimals).toString()} \n${token.name} from \n${from}`;
        let data = '';
        this.notificationProvider.scheduleNotification(text, data);
      }
    });

  }

  public divideBalance(balance: string, decimals: string): number {
    return parseInt(balance) / 10**parseInt(decimals);
  }

}
