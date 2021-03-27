import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportItemComponent } from './report-item/report-item.component';
import { ReportResolver } from './report-resolver.resolver';

const routes: Routes = [
  {
    path: 'report/:id',
    component: ReportItemComponent,
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
