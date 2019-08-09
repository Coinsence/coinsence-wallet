import { Component } from '@angular/core';
import { Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { EtherProvider } from '../providers/ether/ether';
import { TokenProvider } from '../providers/token/token';
import { NotificationProvider } from '../providers/notification/notification';
import { NetworkProvider } from '../providers/network/network';
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
    backgroundMode: BackgroundMode,
    events: Events,
    etherProvider : EtherProvider,
    tokenProvider: TokenProvider,
    notificationProvider: NotificationProvider,
    networkProvider: NetworkProvider,
    public toastCtrl: ToastController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.styleLightContent();
      splashScreen.hide();
      backgroundMode.enable();

      // Check connectivity
      networkProvider.initializeNetworkEvents();
      // Offline event
      events.subscribe('network:offline', () => {
        this.disconnectToast();
      });
      // Online event
      events.subscribe('network:online', () => {
        this.connectToast();
      });

      //check if app have permission to show notifications
      notificationProvider.checkPermission();

      //if an imported, scanned or created wallet exist
      if(localStorage.getItem('isWallet') == 'true') {
        let provider = etherProvider.get();
        let wallet = JSON.parse(localStorage.getItem('wallet'));
        let tokens = JSON.parse(localStorage.getItem('defaultTokens'));

        tokens.forEach(token => {
          tokenProvider.setTokenListener(wallet.signingKey.address, token, provider)
        });

        this.rootPage = 'TabsPage';
      }
      else {
        localStorage.setItem('defaultTokens', JSON.stringify(defaultTokens));
        this.rootPage = 'LoginPage';
      }
    });
  }

  connectToast() {
    let toast = this.toastCtrl.create({
      message: "You are online",
      duration: 2000,
      position: 'buttom',
      cssClass: 'success',
    });

    toast.present();
  }

  disconnectToast() {
    let toast = this.toastCtrl.create({
      message: "You are offline",
      duration: 2000,
      position: 'buttom',
      cssClass: 'danger',
    });

    toast.present();
  }
}

