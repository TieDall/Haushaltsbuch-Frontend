import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { DataCollectionModule } from '../data-collection/data-collection.module';
import { ReportingModule } from '../reporting/reporting.module';
import { ResetDatabaseDialogComponent } from './reset-database-dialog/reset-database-dialog.component';
import { BackupDialogComponent } from './backup-dialog/backup-dialog.component';
import { BackupConfirmDialogComponent } from './backup-confirm-dialog/backup-confirm-dialog.component';
import { BackupResultDialogComponent } from './backup-result-dialog/backup-result-dialog.component';



@NgModule({
  declarations: [DashboardComponent, ResetDatabaseDialogComponent, BackupDialogComponent, BackupConfirmDialogComponent, BackupResultDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DataCollectionModule,
    ReportingModule
  ]
})
export class DashboardModule { }
