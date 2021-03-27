import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { DataCollectionModule } from '../data-collection/data-collection.module';
import { ReportingModule } from '../reporting/reporting.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DataCollectionModule,
    ReportingModule
  ]
})
export class DashboardModule { }
