import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportWalletPage } from './import-wallet';

@NgModule({
  declarations: [
    ImportWalletPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportWalletPage),
  ],
})
export class ImportWalletPageModule {}
