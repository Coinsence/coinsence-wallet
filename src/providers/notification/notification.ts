import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Badge } from '@ionic-native/badge';

@Injectable()
export class NotificationProvider {

  constructor(
    private localNotifications: LocalNotifications,
    private badge: Badge
  ) {
    console.log('Hello NotificationProvider Provider');
    this.badge.set(0);
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
      data: data,
      led: true,
      launch: true,
      foreground: true
    });

    this.badge.increase(1);

    this.localNotifications.on('click').subscribe(notification => {
      console.log("notification clicked!");
      this.badge.decrease(1);
    });

    this.localNotifications.on('clear').subscribe(notification => {
      console.log("notification cleared!");
      this.badge.decrease(1);
    });
  }

}
