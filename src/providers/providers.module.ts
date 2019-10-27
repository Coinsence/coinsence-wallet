import { NgModule } from "@angular/core";
import { EtherProvider } from './ether/ether';
import { WalletProvider } from './wallet/wallet';
import { EtherscanProvider } from './etherscan/etherscan';
import { TokenProvider } from './token/token';
import { EthplorerProvider } from './ethplorer/ethplorer';
import { NotificationProvider } from './notification/notification';
import { NetworkProvider } from './network/network';

@NgModule({
  providers: [
    EtherProvider,
    WalletProvider,
    EtherscanProvider,
    TokenProvider,
    EthplorerProvider,
    NotificationProvider,
    NetworkProvider
  ]
})
export class ProvidersModule { }
