import { Component, Inject, Renderer2, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  ContextData,
  selectLastTick,
  StartClockAction} from '@timetool/store/context';
import { HM } from '@timetool/utils/time-model';
import { ResetWeekAction, FetchWeekAction } from '@timetool/store/timesheet';
import { Observable } from 'rxjs';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  time$: Observable<HM>;
  private hoverTest: Function;
  private touchTest: Function;

  constructor(
    private store: Store<ContextData>
  ) {
    // set the tick for the time the app was opened.
    this.store.dispatch(new StartClockAction(HM.Now()));

    this.store.dispatch(new ResetWeekAction());
    this.store.dispatch(new FetchWeekAction());

    this.time$ = this.store.select(selectLastTick);
  }

  ngOnDestroy() {
    this.hoverTest();
    this.touchTest();
  }
}
