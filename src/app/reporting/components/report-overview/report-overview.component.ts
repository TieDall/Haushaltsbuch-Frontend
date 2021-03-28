import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Report } from 'src/app/shared/models/report';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { ReportCreateDialogComponent } from '../report-create-dialog/report-create-dialog.component';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss']
})
export class ReportOverviewComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Report`;

  public reports: Report[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly matDialog: MatDialog
  ) { }

  private loadData(): Observable<any> {
    return this.httpClient.get<Report[]>(this.url)
      .pipe(
        tap((x: Report[]) => this.reports = x)
      );
  }

  public add() {
    const dialogRef = this.matDialog.open(ReportCreateDialogComponent);
    this.subscriptions.add(
      dialogRef.afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.loadData().subscribe());
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
