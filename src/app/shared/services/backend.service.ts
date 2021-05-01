import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  public backendReachable = new BehaviorSubject<boolean>(false);

  constructor() { }
}
