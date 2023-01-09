import { ChangeDetectorRef, Component } from '@angular/core';
import { DataService } from "./data.service";
import { MediaMatcher } from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pet-calculator';

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public data: DataService) {
    this.mobileQuery = media.matchMedia('(max-width: 804px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.data.restore()
  }
}
