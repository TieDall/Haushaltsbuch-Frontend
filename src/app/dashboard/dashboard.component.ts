import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Subscription } from 'rxjs';
import { delay, finalize, switchMap } from 'rxjs/operators';
import { AppConfigService } from '../shared/services/app-config.service';
import { BackendService } from '../shared/services/backend.service';
import { SpinnerOverlayService } from '../shared/services/spinner-overlay.service';
import { ResetDatabaseDialogComponent } from './reset-database-dialog/reset-database-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Konfiguration`;

  public disableCard = true;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly dialog: MatDialog,
    private readonly backendService: BackendService,
    private readonly spinnerOverlayService: SpinnerOverlayService
  ) { }

  public resetDatabase() {
    this.spinnerOverlayService.show();
    this.subscriptions.add(
      this.dialog.open(ResetDatabaseDialogComponent, {disableClose: true}).afterClosed()
        .pipe(
          switchMap((contineReset: boolean) => contineReset ? this.httpClient.post(`${this.url}/ResetDatabase`, null) : of([])),
          finalize(() => this.spinnerOverlayService.hide())
        )
        .subscribe());
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.backendService.backendReachable.subscribe((x: boolean) => {
        this.disableCard = !x;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
