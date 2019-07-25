import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from "@ionic-native/qr-scanner";
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';

import { EtherProvider } from '../providers/ether/ether';
import { WalletProvider } from '../providers/wallet/wallet';
import { EtherscanProvider } from '../providers/etherscan/etherscan';
import { TokenProvider } from '../providers/token/token';
import { EthplorerProvider } from '../providers/ethplorer/ethplorer';
import { BlockscoutProvider } from '../providers/blockscout/blockscout';
import { NotificationProvider } from '../providers/notification/notification';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  /** Add QRScanner in the provider array **/
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QRScanner,
    LocalNotifications,
    EtherProvider,
    WalletProvider,
    EtherscanProvider,
    TokenProvider,
    EthplorerProvider,
    BlockscoutProvider,
    NotificationProvider
  ]
})
export class AppModule {}
