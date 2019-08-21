import { NgModule } from '@angular/core';
import { ShortNumberPipe } from './short-number/short-number';
@NgModule({
	declarations: [ShortNumberPipe],
	imports: [],
	exports: [ShortNumberPipe]
})
export class PipesModule {}
