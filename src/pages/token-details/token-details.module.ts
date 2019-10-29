import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TokenDetailsPage } from './token-details';

@NgModule({
  declarations: [
    TokenDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TokenDetailsPage),
  ],
})
export class TokenDetailsPageModule {}
