import { Component, Inject, Renderer2, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { interval } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HM } from '@timetool/utils/time-model/src/lib';

// const PATH_TO_IMGS = require.context('../../public/images');

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  now: HM;

  private hoverTest: Function;
  private touchTest: Function;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private renderer: Renderer2
  ) {
    // this.touchTest = this.renderer.listen('window', 'touchstart', evt => {
    //   // this.$log.log('Setting touch supported');
    //   this.store.dispatch(new contextActions.SetTouchDeviceSupportAction());
    //   this.touchTest();
    // });
    // this.hoverTest = this.renderer.listen('window', 'mouseover', evt => {
    //   // this.$log.log('Setting hover supported');
    //   this.store.dispatch(new contextActions.SetHoverDeviceSupportAction());
    //   this.hoverTest();
    // });
    //
    // this.document
    //   .getElementById('appFavicon')
    //   .setAttribute('href', `${PATH_TO_IMGS('./icon.png')}`);
    // this.now = HM.Now();
    // store.dispatch(new contextActions.LoadPageAction(this.now));
    //
    // store.dispatch(new timesheetActions.ResetWeekAction());
    // store.dispatch(new timesheetActions.FetchWeekAction());
    //
    // interval(1000)
    //   .pipe(
    //     map(() => HM.Now()),
    //     filter(value => !this.now || !this.now.equals(value))
    //   )
    //   .subscribe(newTime => {
    //     this.now = newTime;
    //     store.dispatch(new contextActions.TickAction(this.now));
    //   });
  }

  ngOnDestroy() {
    this.hoverTest();
    this.touchTest();
  }
}
