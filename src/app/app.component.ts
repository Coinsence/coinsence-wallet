import { Component } from '@angular/core';
import { Platform, Events, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
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

      // Check if wallet exist
      if(localStorage.getItem("isWallet") == "true") {
        this.rootPage = 'TabsPage';
      }
      else {
        localStorage.setItem("defaultTokens", JSON.stringify(defaultTokens));
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

