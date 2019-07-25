import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class NotificationProvider {

  constructor(
    private localNotifications: LocalNotifications
  ) {
    console.log('Hello NotificationProvider Provider');
  }

  public checkPermission() {
    this.localNotifications.hasPermission().then((hasPermission) => {
      if(!hasPermission) {
        this.localNotifications.requestPermission();
      }
    });
  }

  public scheduleNotification(
    text: string,
    data: string
  ) {
    this.localNotifications.schedule({
      id: 1,
      text: text,
      data: data
    });
  }

}
