import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class BackendEndpointsService {

  /**
   * Standard url for crud operations on Buchung.
   * Supported operations: POST, GET (by id), PUT, DELETE
   */
  public readonly buchungRoute = `${AppConfigService.appConfig.apiServer.url}Buchung`;
  /**
   * Url for getting Buchungen by month.
   *
   * @example
   * `${buchungenByMonthRoute}/[year]/[month]`
   * For January in 2020:
   * `${buchungenByMonthRoute}/2020/1`
   */
  public readonly buchungenByMonthRoute = `${AppConfigService.appConfig.apiServer.url}${this.buchungRoute}/GetBuchungenByMonth`;

  /**
   * Standard url for crud operations on Kategorie.
   * Supported operations: POST, GET, GET (by id), PUT, DELETE
   */
  public readonly kategorieRoute = `${AppConfigService.appConfig.apiServer.url}Kategorie`;

}
