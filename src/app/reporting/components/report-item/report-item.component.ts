import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Report } from 'src/app/shared/models/report';
import { AppConfigService } from 'src/app/shared/services/app-config.service';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service';

@Component({
  selector: 'app-report-item',
  templateUrl: './report-item.component.html',
  styleUrls: ['./report-item.component.scss']
})
export class ReportItemComponent implements OnInit, OnDestroy {

  public subscriptions = new Subscription();

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Report`;

  public report: Report;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly httpClient: HttpClient,
    private readonly route: Router,
    private readonly snackBar: MatSnackBar,
    private readonly spinnerOverlayService: SpinnerOverlayService
  ) {
    this.report = this.activatedRoute.snapshot.data.report as Report;
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public delete(): void {
    this.spinnerOverlayService.show();
    this.subscriptions.add(
      this.httpClient
        .delete(`${this.url}/${this.report.id}`)
        .pipe(
          tap(() => this.route.navigate(['/'])),
          finalize(() => this.spinnerOverlayService.hide())
        )
        .subscribe());
  }
}
