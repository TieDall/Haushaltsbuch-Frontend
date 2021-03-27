import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReportOverviewComponent } from './report-overview/report-overview.component';
import { RouterModule } from '@angular/router';
import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportItemComponent } from './report-item/report-item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ReportOverviewComponent, ReportItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReportingRoutingModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    ReportOverviewComponent
  ]
})
export class ReportingModule { }
