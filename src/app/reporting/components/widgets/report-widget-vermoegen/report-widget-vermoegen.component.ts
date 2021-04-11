import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Ruecklage } from 'src/app/shared/models/ruecklage';
import { AppConfigService } from 'src/app/shared/services/app-config.service';

@Component({
  selector: 'app-report-widget-vermoegen',
  templateUrl: './report-widget-vermoegen.component.html',
  styleUrls: ['./report-widget-vermoegen.component.scss']
})
export class ReportWidgetVermoegenComponent implements OnInit, OnDestroy {

  @Input() config: string;

  private readonly subscriptions = new Subscription();

  private readonly urlVermoegen = `${AppConfigService.appConfig.apiServer.url}Auswertung/GetVermoegen`;
  private readonly urlRuecklagen = `${AppConfigService.appConfig.apiServer.url}Ruecklage`;

  public vermoegen = 0;
  public isInklVermoegen = false;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  private load() {
    return zip(
      this.httpClient.get(`${this.urlVermoegen}`),
      this.httpClient.get(`${this.urlRuecklagen}`)
    ).pipe(
      tap(([vermoegen, ruecklagen]) => {
        this.vermoegen = vermoegen as number;
        if (this.config) {
          if (JSON.parse(this.config)['includeRuecklagen']) {
            this.isInklVermoegen = true;
            this.vermoegen += (ruecklagen as Ruecklage[]).reduce((acc, cur) => acc + cur.summe, 0);
          }
        }
      })
    );
  }

  public ngOnInit(): void {
    this.load().subscribe();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
