import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ModeService } from 'src/app/services/mode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private modeService: ModeService,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  showCreateWebsite() {
    this.modeService.createWebsite = true;
    this.modeService.editWebsite = false;
    this.modeService.viewWebsite = false;
  }
  


  showEditWebsite(n_ID: number) {
    this.modeService.createWebsite = false;
    this.modeService.editWebsite = true;
    this.modeService.viewWebsite = false;

  }

  showViewWebsite(n_ID: number) {
    this.modeService.createWebsite = false;
    this.modeService.editWebsite = false;
    this.modeService.viewWebsite = true;

  }

  showViewApplication() {
    this.modeService.createWebsite = false;
    this.modeService.editWebsite = false;
    this.modeService.viewWebsite = true;

  }

}
