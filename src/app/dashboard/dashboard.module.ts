import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { DataCollectionModule } from '../data-collection/data-collection.module';
import { ReportingModule } from '../reporting/reporting.module';
import { ResetDatabaseDialogComponent } from './reset-database-dialog/reset-database-dialog.component';
import { BackupDialogComponent } from './backup-dialog/backup-dialog.component';



@NgModule({
  declarations: [DashboardComponent, ResetDatabaseDialogComponent, BackupDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DataCollectionModule,
    ReportingModule
  ]
})
export class DashboardModule { }
