import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { BuchungListComponent } from './buchung/buchung-list/buchung-list.component';
import { BuchungEditComponent } from './buchung/buchung-edit/buchung-edit.component';
import { KategorieListComponent } from './kategorie/kategorie-list/kategorie-list.component';
import { KategorieEditComponent } from './kategorie/kategorie-edit/kategorie-edit.component';
import { DauerauftragEditComponent } from './dauerauftrag/dauerauftrag-edit/dauerauftrag-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DauerauftragGroupedListComponent } from './dauerauftrag/dauerauftrag-grouped-list/dauerauftrag-grouped-list.component';
import { DauerauftragGroupedEditComponent } from './dauerauftrag/dauerauftrag-grouped-edit/dauerauftrag-grouped-edit.component';
import { KonfigurationListComponent } from './konfiguration/konfiguration-list/konfiguration-list.component';
import { KonfigurationEditComponent } from './konfiguration/konfiguration-edit/konfiguration-edit.component';



@NgModule({
  declarations: [
    BuchungListComponent,
    BuchungEditComponent,
    KategorieListComponent,
    KategorieEditComponent,
    DauerauftragEditComponent,
    DauerauftragGroupedListComponent,
    DauerauftragGroupedEditComponent,
    KonfigurationListComponent,
    KonfigurationEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DataCollectionModule { }
