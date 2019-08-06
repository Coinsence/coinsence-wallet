import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner";

@IonicPage()
@Component({
  selector: 'page-scan-qr',
  templateUrl: 'scan-qr.html',
})
export class ScanQrPage {

  private isBackMode: boolean = true;
  private isFlashLightOn: boolean = false;
  private scanSub: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public qrScanner: QRScanner
  ) {
  }


  ionViewWillEnter(){
    // request the permission
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('Camera Permission Given');

          //show camera
          this.showCamera();

          // start scanning
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log(text);
            this.scanSub.unsubscribe(); // stop scanning
            this.viewController.dismiss(text);
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        }
        // no idea if this work
        // as denied permission return an exception not status.denied
        else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          console.log('Camera permission denied');
          this.closeModal();
        }
        else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          console.log('Permission denied for this runtime.');
          this.closeModal();
        }
      })
      .catch((e: any) => {
          this.closeModal();
          console.log('Error is', e);
      });
  }

  closeModal() {
    this.viewController.dismiss();
  }

  toggleFlashLight(){
    /** Default isFlashLightOn is false ,
     * enable it if false **/

    this.isFlashLightOn = !this.isFlashLightOn;
    if(this.isFlashLightOn){
      this.qrScanner.enableLight();
    }
    else{
      this.qrScanner.disableLight();
    }

  }

  toggleCamera(){
    /** Toggle Camera , Default is isBackMode is true , toggle
     * to false to enable front camera and vice versa.
     *
     * @type {boolean}
     */
    this.isBackMode =  !this.isBackMode;
    if(this.isBackMode){
      this.qrScanner.useFrontCamera();
    }
    else{
      this.qrScanner.useBackCamera();
    }
  }

  ionViewWillLeave(){
    this.qrScanner.hide(); // hide camera preview
    this.hideCamera();
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
}
