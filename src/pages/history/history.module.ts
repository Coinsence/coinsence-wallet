import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { ShortNumberPipe } from './short-number.pipe';

@NgModule({
  declarations: [
    HistoryPage,
    ShortNumberPipe
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
  ],
})
export class HistoryPageModule {}
