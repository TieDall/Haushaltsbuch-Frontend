import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuchungListComponent } from './data-collection/buchung/buchung-list/buchung-list.component';
import { DauerauftragGroupedListComponent } from './data-collection/dauerauftrag/dauerauftrag-grouped-list/dauerauftrag-grouped-list.component';
import { GutscheinListComponent } from './data-collection/gutschein/gutschein-list/gutschein-list.component';
import { KategorieListComponent } from './data-collection/kategorie/kategorie-list/kategorie-list.component';
import { KonfigurationListComponent } from './data-collection/konfiguration/konfiguration-list/konfiguration-list.component';
import { RuecklageListComponent } from './data-collection/ruecklage/ruecklage-list/ruecklage-list.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
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
    component: DauerauftragGroupedListComponent
  },
  {
    path: 'konfiguration',
    component: KonfigurationListComponent
  },
  {
    path: 'gutschein',
    component: GutscheinListComponent
  },
  {
    path: 'ruecklage',
    component: RuecklageListComponent
  },
  {
    path: 'reporting',
    loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
