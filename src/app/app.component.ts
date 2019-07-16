import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//default tokens list
import { defaultTokens } from '../utils/default-tokens';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //if an imported, scanned or created wallet exist
      if(localStorage.getItem("isWallet") == "true") {
        this.rootPage = 'TabsPage';
      }
      else {
        this.rootPage = 'LoginPage';
      }

      localStorage.setItem("defaultTokens", JSON.stringify(defaultTokens));
    });
  }
}

