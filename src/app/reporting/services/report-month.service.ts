import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportMonthService {

  public subject = new BehaviorSubject({ month: 0, year: 0 });

  constructor() { }
}
