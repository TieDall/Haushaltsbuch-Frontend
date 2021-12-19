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
import { GutscheinListComponent } from './gutschein/gutschein-list/gutschein-list.component';
import { GutscheinEditComponent } from './gutschein/gutschein-edit/gutschein-edit.component';
import { RuecklageEditComponent } from './ruecklage/ruecklage-edit/ruecklage-edit.component';
import { RuecklageListComponent } from './ruecklage/ruecklage-list/ruecklage-list.component';
import { KategorieDeleteDialogComponent } from './kategorie/kategorie-delete-dialog/kategorie-delete-dialog.component';
import { IconSelectDialogComponent } from './kategorie/icon-select-dialog/icon-select-dialog.component';



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
    KonfigurationEditComponent,
    GutscheinListComponent,
    GutscheinEditComponent,
    RuecklageEditComponent,
    RuecklageListComponent,
    KategorieDeleteDialogComponent,
    IconSelectDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DataCollectionModule { }
