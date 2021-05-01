import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {

  public isBackendReachable = false;

  constructor(
    private readonly backendService: BackendService
  ) { }

  public ngOnInit(): void {
    this.backendService.backendReachable.subscribe((isBackendReachable: boolean) => {
      // debugger;
      this.isBackendReachable = isBackendReachable;
    });
  }

}
