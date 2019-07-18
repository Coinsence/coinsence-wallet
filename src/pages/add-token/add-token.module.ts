import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTokenPage } from './add-token';

@NgModule({
  declarations: [
    AddTokenPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTokenPage),
  ],
})
export class AddTokenPageModule {}
