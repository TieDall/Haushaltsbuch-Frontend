import { Component, OnInit } from '@angular/core';
import { BackendService } from './shared/services/backend.service';
import { VersionService } from './shared/services/version.service';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isBackendReachable = false;
  private version = version;

  constructor(
    private readonly backendService: BackendService,
    private readonly versionService: VersionService
  ) {
    this.versionService.version = this.version;
  }

  public ngOnInit(): void {
    this.backendService.backendReachable.subscribe((isReachable: boolean) => {
      this.isBackendReachable = isReachable;
    });
  }
}
