import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EtherProvider } from '../providers/ether/ether';
import { TokenProvider } from '../providers/token/token';
import { NotificationProvider } from '../providers/notification/notification';
//default tokens list
import { defaultTokens } from '../utils/default-tokens';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    etherProvider : EtherProvider,
    tokenProvider: TokenProvider,
    notificationProvider: NotificationProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //check if app have permission to show notifications
      notificationProvider.checkPermission();

      //if an imported, scanned or created wallet exist
      if(localStorage.getItem('isWallet') == 'true') {
        let provider = etherProvider.get();
        let wallet = JSON.parse(localStorage.getItem('wallet'));
        let tokens = JSON.parse(localStorage.getItem('defaultTokens'));
        tokenProvider.setTokenListener(wallet.signingKey.address, tokens, provider);

        this.rootPage = 'TabsPage';
      }
      else {
        localStorage.setItem('defaultTokens', JSON.stringify(defaultTokens));
        this.rootPage = 'LoginPage';
      }
    });
  }
}

