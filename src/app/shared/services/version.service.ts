import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private readonly urlReleases = 'https://api.github.com/repos/TieDall/Haushaltsbuch-Frontend/releases';

  private currentVersion = '';
  private latestVersion = '';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {
    this.checkLastRelease();
  }

  public get version(): string {
    return this.latestVersion;
  }

  public set version(currentVersion: string) {
    this.currentVersion = currentVersion;
  }

  private checkLastRelease() {
    this.httpClient.get(this.urlReleases).subscribe((x: any[]) => {
      const sortedReleases = x.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.latestVersion = (sortedReleases[0].name as string).substring(1, (sortedReleases[0].name as string).length);

      if (this.checkNewerVersion(this.currentVersion, this.latestVersion)) {
        this.snackBar.open('Neue Version verfügbar! (｡◕‿◕｡)', 'Ok', { duration: 5000 });
      }
    });
  }

  /**
   * Returns true when currentVerion minor than versionToCheck.
   * @param currentVersion
   * @param versionToCheck
   */
  private checkNewerVersion(currentVersion: string, versionToCheck: string): boolean {
    const majorCurrentVersion = currentVersion.substring(0, currentVersion.indexOf('.'));
    const minorCurrentVersion =
      currentVersion.substr(currentVersion.indexOf('.') + 1).substring(0, currentVersion.substr(currentVersion.indexOf('.') + 1).indexOf('.'));
    const patchCurrentVersion = currentVersion.substring(currentVersion.lastIndexOf('.') + 1);

    const majorVersionToCheck = versionToCheck.substring(0, versionToCheck.indexOf('.'));
    const minorVersionToCheck =
      versionToCheck.substr(versionToCheck.indexOf('.') + 1).substring(0, versionToCheck.substr(versionToCheck.indexOf('.') + 1).indexOf('.'));;
    const patchVersionToCheck = versionToCheck.substring(versionToCheck.lastIndexOf('.') + 1);

    let result = majorVersionToCheck > majorCurrentVersion ||
      (majorVersionToCheck === majorCurrentVersion && minorVersionToCheck > minorCurrentVersion) ||
      (majorVersionToCheck === majorCurrentVersion && minorVersionToCheck === minorCurrentVersion && patchVersionToCheck > patchCurrentVersion);

    return result;
  }
}
