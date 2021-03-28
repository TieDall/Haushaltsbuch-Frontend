import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportEditComponent } from './components/report-edit/report-edit.component';
import { ReportItemComponent } from './components/report-item/report-item.component';
import { ReportResolver } from './resolver/report-resolver.resolver';

const routes: Routes = [
  {
    path: 'report/:id',
    component: ReportItemComponent,
    resolve: {
      report: ReportResolver
    }
  },
  {
    path: 'report/edit/:id',
    component: ReportEditComponent,
    resolve: {
      report: ReportResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
