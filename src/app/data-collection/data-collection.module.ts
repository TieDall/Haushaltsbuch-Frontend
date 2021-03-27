import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { BuchungListComponent } from './buchung/buchung-list/buchung-list.component';
import { BuchungEditComponent } from './buchung/buchung-edit/buchung-edit.component';
import { KategorieListComponent } from './kategorie/kategorie-list/kategorie-list.component';
import { KategorieEditComponent } from './kategorie/kategorie-edit/kategorie-edit.component';
import { DauerauftragListComponent } from './dauerauftrag/dauerauftrag-list/dauerauftrag-list.component';
import { DauerauftragEditComponent } from './dauerauftrag/dauerauftrag-edit/dauerauftrag-edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BuchungListComponent,
    BuchungEditComponent,
    KategorieListComponent,
    KategorieEditComponent,
    DauerauftragListComponent,
    DauerauftragEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DataCollectionModule { }
