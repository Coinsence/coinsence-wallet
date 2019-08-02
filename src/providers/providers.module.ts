import { NgModule } from "@angular/core";
import { EtherProvider } from './ether/ether';
import { WalletProvider } from './wallet/wallet';
import { EtherscanProvider } from './etherscan/etherscan';
import { TokenProvider } from './token/token';
import { EthplorerProvider } from './ethplorer/ethplorer';
import { BlockscoutProvider } from './blockscout/blockscout';

@NgModule({
  providers: [
    EtherProvider,
    WalletProvider,
    EtherscanProvider,
    TokenProvider,
    EthplorerProvider,
    BlockscoutProvider
  ]
})
export class ProvidersModule { }
