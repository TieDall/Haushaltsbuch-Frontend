import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { DataCollectionModule } from '../data-collection/data-collection.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    DataCollectionModule
  ]
})
export class DashboardModule { }
