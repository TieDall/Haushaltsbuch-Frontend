import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Report } from '../shared/models/report';
import { AppConfigService } from '../shared/services/app-config.service';

@Injectable({ providedIn: 'root' })
export class ReportResolver implements Resolve<any> {

  private readonly url = `${AppConfigService.appConfig.apiServer.url}Report`;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${this.url}/${route.paramMap.get('id')}`);
  }
}
