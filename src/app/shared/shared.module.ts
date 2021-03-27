import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnBuchungComponent } from './utils/btn-buchung/btn-buchung.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [BtnBuchungComponent],
  exports: [BtnBuchungComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
