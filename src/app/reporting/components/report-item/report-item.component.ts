import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Report } from 'src/app/shared/models/report';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

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
    private readonly route: Router
  ) {
    this.report = this.activatedRoute.snapshot.data.report as Report;
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public delete(): void {
    this.subscriptions.add(
      this.httpClient
        .delete(`${this.url}/${this.report.id}`)
        .pipe(
          tap(() => this.route.navigate(['/']))
        )
        .subscribe());
  }
}
