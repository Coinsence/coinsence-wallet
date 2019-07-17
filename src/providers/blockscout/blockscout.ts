import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable()
export class BlockscoutProvider {

  constructor(
    public http: HttpClient
  ) {
    console.log('Hello BlockscoutProvider Provider');
  }

  public async getTokenInfo(tokenAddress: string) {
    let getUrl = `${environment.apiBlockscoutRinkeby.url}?module=token&action=getToken&contractaddress=${tokenAddress}`;

    return this.http.get(getUrl).toPromise();
  }

}
