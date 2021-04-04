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
import { ReportWidgetMonatsbilanzComponent } from './components/widgets/report-widget-monatsbilanz/report-widget-monatsbilanz.component';
import { ReportWidgetMonatsausgabenComponent } from './components/widgets/report-widget-monatsausgaben/report-widget-monatsausgaben.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ReportStopEditingDialogComponent } from './components/report-stop-editing-dialog/report-stop-editing-dialog.component';
import { ReportWidgetMonatsdauerauftraegeComponent } from './components/widgets/report-widget-monatsdauerauftraege/report-widget-monatsdauerauftraege.component';
import { ReportWidgetMonatsbuchungenComponent } from './components/widgets/report-widget-monatsbuchungen/report-widget-monatsbuchungen.component';



@NgModule({
  declarations: [
    ReportOverviewComponent,
    ReportItemComponent,
    ReportWidgetWrapperComponent,
    ReportWidgetMonatsauswahlComponent,
    ReportEditComponent,
    ReportRowDialogComponent,
    ReportItemDialogComponent,
    ReportCreateDialogComponent,
    ReportWidgetMonatsbilanzComponent,
    ReportWidgetMonatsausgabenComponent,
    ReportStopEditingDialogComponent,
    ReportWidgetMonatsdauerauftraegeComponent,
    ReportWidgetMonatsbuchungenComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ReportingRoutingModule,
    SharedModule,
    MaterialModule,

    // NgxEchartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [
    ReportOverviewComponent
  ]
})
export class ReportingModule { }
