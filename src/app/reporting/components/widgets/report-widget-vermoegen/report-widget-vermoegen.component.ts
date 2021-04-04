import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-vermoegen',
  templateUrl: './report-widget-vermoegen.component.html',
  styleUrls: ['./report-widget-vermoegen.component.scss']
})
export class ReportWidgetVermoegenComponent implements OnInit, OnDestroy {

  private readonly subscriptions = new Subscription();

  private readonly urlVermoegen = `${AppConfigService.appConfig.apiServer.url}Auswertung/GetVermoegen`;

  public vermoegen = 0;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  private load() {
    this.subscriptions.add(
      this.httpClient.get(`${this.urlVermoegen}`).subscribe((x: number) => this.vermoegen = x)
    );
  }

  public ngOnInit(): void {
    this.load();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
