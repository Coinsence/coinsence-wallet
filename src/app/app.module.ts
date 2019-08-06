import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from "@ionic-native/qr-scanner";
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';

//Providers module
import { ProvidersModule } from '../providers/providers.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ProvidersModule
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
    LocalNotifications
  ]
})
export class AppModule {}
