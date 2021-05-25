import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { Report } from 'src/app/shared/models/report';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { BackendService } from 'src/app/shared/services/backend.service';
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

  public loaded = false;

  public disableButton = true;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly backendService: BackendService,
    private readonly matDialog: MatDialog
  ) { }

  private loadData(): Observable<any> {
    return this.httpClient.get<Report[]>(this.url)
      .pipe(
        tap((x: Report[]) => this.reports = x.sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung))),
        finalize(() => this.loaded = true)
      );
  }

  public add() {
    const dialogRef = this.matDialog.open(ReportCreateDialogComponent, {disableClose: true});
    this.subscriptions.add(
      dialogRef.afterClosed()
        .pipe(
          switchMap(() => this.loadData())
        )
        .subscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.add(this.loadData().subscribe());

    this.subscriptions.add(
      this.backendService.backendReachable.subscribe((x: boolean) => {
        this.disableButton = !x;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
