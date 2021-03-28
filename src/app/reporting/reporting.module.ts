import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReportOverviewComponent } from './components/report-overview/report-overview.component';
import { RouterModule } from '@angular/router';
import { ReportingRoutingModule } from './reporting-routing.module';
import { ReportItemComponent } from './components/report-item/report-item.component';
import { SharedModule } from '../shared/shared.module';
import { ReportWidgetWrapperComponent } from './components/report-widget-wrapper/report-widget-wrapper.component';
import { ReportWidgetMonatsauswahlComponent } from './components/widgets/report-widget-monatsauswahl/report-widget-monatsauswahl.component';
import { ReportEditComponent } from './components/report-edit/report-edit.component';
import { ReportRowDialogComponent } from './components/report-row-dialog/report-row-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportItemDialogComponent } from './components/report-item-dialog/report-item-dialog.component';
import { ReportCreateDialogComponent } from './components/report-create-dialog/report-create-dialog.component';



@NgModule({
  declarations: [
    ReportOverviewComponent,
    ReportItemComponent,
    ReportWidgetWrapperComponent,
    ReportWidgetMonatsauswahlComponent,
    ReportEditComponent,
    ReportRowDialogComponent,
    ReportItemDialogComponent,
    ReportCreateDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
