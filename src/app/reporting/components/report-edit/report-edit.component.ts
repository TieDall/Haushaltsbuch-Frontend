import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Report } from 'src/app/shared/models/report';
import { ReportItem } from 'src/app/shared/models/report-item';
import { ReportRow } from 'src/app/shared/models/report-row';
import { ReportWidget } from 'src/app/shared/models/report-widget';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { ReportItemDialogComponent } from '../report-item-dialog/report-item-dialog.component';
import { ReportRowDialogComponent } from '../report-row-dialog/report-row-dialog.component';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss']
})
export class ReportEditComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Report`;

  public report: Report;

  public form: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly matDialog: MatDialog,
    private readonly httpClient: HttpClient
  ) {
    this.report = this.activatedRoute.snapshot.data.report as Report;

    this.form = this.formBuilder.group({
      bezeichnung: this.report.bezeichnung
    });
  }

  public save() {
    this.report.bezeichnung = this.form.get('bezeichnung').value;
    this.subscriptions.add(
      this.httpClient
        .put(`${this.url}/${this.report.id}`, this.report)
        .subscribe());
  }

  public addRow() {
    this.subscriptions.add(
      this.matDialog.open(ReportRowDialogComponent).afterClosed().subscribe(anzahl => {
        const reportItems: ReportItem[] = [];
        for (let index = 0; index < anzahl; index++) {
          reportItems.push({
            id: 0,
            position: index,
            config: null,
            reportRow: null,
            reportRowId: 0,
            reportWidget: null
          });
        }

        this.report.reportRows.push({
          position: 1,
          reportId: this.report.id,
          id: 0,
          report: null,
          reportItems
        });
      }));
  }

  public editItem(reportItem: ReportItem) {
    this.subscriptions.add(
      this.matDialog.open(
        ReportItemDialogComponent,
        { width: '80%', maxHeight: '80%' }
      ).afterClosed().subscribe((reportWidget: ReportWidget) => {
        reportItem.reportWidget = reportWidget;
      }));
  }

  public deleteRow(value: ReportRow) {
    const index = this.report.reportRows.indexOf(value);
    this.report.reportRows.splice(index, 1);
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
