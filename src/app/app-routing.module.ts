import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuchungListComponent } from './data-collection/buchung/buchung-list/buchung-list.component';
import { DauerauftragListComponent } from './data-collection/dauerauftrag/dauerauftrag-list/dauerauftrag-list.component';
import { KategorieListComponent } from './data-collection/kategorie/kategorie-list/kategorie-list.component';


const routes: Routes = [
  {
    path: 'kategorie',
    component: KategorieListComponent
  },
  {
    path: 'buchung',
    component: BuchungListComponent
  },
  {
    path: 'dauerauftrag',
    component: DauerauftragListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
