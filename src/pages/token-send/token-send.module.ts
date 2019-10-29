import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TokenSendPage } from './token-send';

@NgModule({
  declarations: [
    TokenSendPage,
  ],
  imports: [
    IonicPageModule.forChild(TokenSendPage),
  ],
})
export class TokenSendPageModule {}
