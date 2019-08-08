import { NgModule } from "@angular/core";
import { EtherProvider } from './ether/ether';
import { WalletProvider } from './wallet/wallet';
import { EtherscanProvider } from './etherscan/etherscan';
import { TokenProvider } from './token/token';
import { EthplorerProvider } from './ethplorer/ethplorer';
import { BlockscoutProvider } from './blockscout/blockscout';
import { NetworkProvider } from './network/network';

@NgModule({
  providers: [
    EtherProvider,
    WalletProvider,
    EtherscanProvider,
    TokenProvider,
    EthplorerProvider,
    BlockscoutProvider,
    NetworkProvider
  ]
})
export class ProvidersModule { }
