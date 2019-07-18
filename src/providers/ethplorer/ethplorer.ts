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
    let getUrl = `${environment.apiEthplorerMainnet.url}/getTokenInfo/${tokenAddress}?apiKey=${environment.apiEthplorerMainnet.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }

  public async getAddressInfo(address: string) {
    let getUrl = `${environment.apiEthplorerMainnet.url}/getAddressInfo/${address}?apiKey=${environment.apiEthplorerMainnet.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }

  public async getTransactionInfo(txHash: string) {
    let getUrl = `${environment.apiEthplorerMainnet.url}/getTxInfo/${txHash}?apiKey=${environment.apiEthplorerMainnet.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }

  public async getAddressTransactions(address: string) {
    let getUrl = `${environment.apiEthplorerMainnet.url}/getAddressTransactions/${address}?apiKey=${environment.apiEthplorerMainnet.apiKey}`;

    return this.http.get(getUrl).toPromise();
  }
}
