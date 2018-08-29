import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreContextService } from '@timetool/store/context';
import { StartClockAction } from '@timetool/store/context';
import { HM } from '@timetool/utils/time-model';
import {
  ResetWeekAction,
  FetchWeekAction,
  StoreTimesheetService
} from '@timetool/store/timesheet';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  time$: Observable<HM>;
  private hoverTest: Function;
  private touchTest: Function;

  constructor(
    private context$: StoreContextService,
    private timesheet$: StoreTimesheetService
  ) {
    // set the tick for the time the app was opened.
    this.context$.dispatch(new StartClockAction(HM.Now()));

    this.timesheet$.dispatch(new ResetWeekAction());
    this.timesheet$.dispatch(new FetchWeekAction());

    this.time$ = this.context$.selectLastTick();
  }

  ngOnDestroy() {
    this.hoverTest();
    this.touchTest();
  }
}
