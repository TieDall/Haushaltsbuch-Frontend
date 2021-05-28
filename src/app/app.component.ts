import { Component, OnInit } from '@angular/core';
import { BackendService } from './shared/services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isBackendReachable = false;

  constructor(private readonly backendService: BackendService) { }

  public ngOnInit(): void {
    this.backendService.backendReachable.subscribe((isReachable: boolean) => {
      this.isBackendReachable = isReachable;
    });
  }
}
