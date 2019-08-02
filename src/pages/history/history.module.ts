import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryPage } from './history';
//Pipes module
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    HistoryPage
  ],
  imports: [
    IonicPageModule.forChild(HistoryPage),
    PipesModule
  ],
})
export class HistoryPageModule {}
