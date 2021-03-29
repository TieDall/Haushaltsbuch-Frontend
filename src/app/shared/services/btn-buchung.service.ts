import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BtnBuchungService {

  public subject = new BehaviorSubject(true);

  constructor() { }
}
