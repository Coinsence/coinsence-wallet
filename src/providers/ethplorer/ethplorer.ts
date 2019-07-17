import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable()
export class EthplorerProvider {

  constructor(
    public http: HttpClient
  ) {
    console.log('Hello EthplorerProvider Provider');
  }

  public async getTokenInfo(tokenAddress: string) {
    let getUrl = `${environment.apiEthplorer.url}/getTokenInfo/${tokenAddress}?apikey=${environment.apiEthplorer.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }

  public async getAddressInfo(address: string) {
    let getUrl = `${environment.apiEthplorer.url}/getAddressInfo/${address}?apikey=${environment.apiEthplorer.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }

  public async getTransactionInfo(txHash: string) {
    let getUrl = `${environment.apiEthplorer.url}/getTxInfo/${txHash}?apikey=${environment.apiEthplorer.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }

  public async getAddressTransactions(address: string) {
    let getUrl = `${environment.apiEthplorer.url}/getAddressTransactions/${address}?apikey=${environment.apiEthplorer.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }
}
