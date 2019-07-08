import { Component } from '@angular/core';
import {ModalController, NavController, ToastController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private modalController: ModalController,
    private toastCtrl: ToastController
  ) {
  }

  scanOnclick() {
    let modal = this.modalController.create('ScanQrPage');
    modal.present();
  }
}
