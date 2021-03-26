import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public static appConfig: IAppConfig;

  private readonly configFilepath = 'assets/app-config.json';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public loadConfig() {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.get(this.configFilepath).toPromise().then((response: IAppConfig) => {
        AppConfigService.appConfig = (response as IAppConfig);
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${this.configFilepath}': ${JSON.stringify(response)}`);
      });
    });
  }
}
