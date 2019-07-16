import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { QRScanner } from "@ionic-native/qr-scanner";
import { EtherProvider } from '../providers/ether/ether';
import { WalletProvider } from '../providers/wallet/wallet';
import { EtherscanProvider } from '../providers/etherscan/etherscan';
import { TokenProvider } from '../providers/token/token';

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
    EtherProvider,
    WalletProvider,
    EtherscanProvider,
    TokenProvider
  ]
})
export class AppModule {}
