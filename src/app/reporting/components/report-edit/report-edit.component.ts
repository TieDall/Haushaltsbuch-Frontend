import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Report } from 'src/app/shared/models/report';
import { ReportItem } from 'src/app/shared/models/report-item';
import { ReportRow } from 'src/app/shared/models/report-row';
import { ReportWidget } from 'src/app/shared/models/report-widget';
import { ReportWidgetLabel } from 'src/app/shared/models/report-widget-labels';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { ReportConfigDialogComponent } from '../report-config-dialog/report-config-dialog.component';
import { ReportItemDialogComponent } from '../report-item-dialog/report-item-dialog.component';
import { ReportRowDialogComponent } from '../report-row-dialog/report-row-dialog.component';
import { ReportStopEditingDialogComponent } from '../report-stop-editing-dialog/report-stop-editing-dialog.component';

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
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
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
        .subscribe(() => {
          this.snackBar.open('Speichern erfolgreich.', 'Okay', {
            duration: 5000
          });
        }));
  }

  public close() {
    this.matDialog.open(ReportStopEditingDialogComponent).afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.router.navigate(['/report/', this.report.id]);
        }
      });
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
        { width: '80%', maxHeight: '80%', disableClose: true, data: reportItem?.reportWidget }
      ).afterClosed().subscribe((reportWidget: ReportWidget) => {
        reportItem.reportWidget = reportWidget;
      }));
  }

  public deleteRow(value: ReportRow) {
    const index = this.report.reportRows.indexOf(value);
    this.report.reportRows.splice(index, 1);
  }

  public isConfigable(reportItem: ReportItem): boolean {
    if (ReportWidgetLabel.get(reportItem.reportWidget)) {
      return true;
    }
    return false;
  }

  public configItem(reportItem: ReportItem) {
    this.subscriptions.add(
      this.matDialog.open(
        ReportConfigDialogComponent,
        { data: reportItem, disableClose: true }
      ).afterClosed().subscribe((result: string) => {
        reportItem.config = result;
      }));
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
