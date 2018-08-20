import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { TimesheetClientService } from '@timetool/utils/timesheet-client';
import { StoreContextService } from '@timetool/store/context/src';

import { TimesheetActionTypes, SetWeekAction } from './timesheet.actions';
import { StoreTimesheetService } from './store-timesheet.service';

@Injectable()
export class TimesheetEffects {
  @Effect()
  fetchWeek$: Observable<Action> = this.actions$.pipe(
    ofType(TimesheetActionTypes.FETCH_WEEK),
    withLatestFrom(
      this.context$.selectStaff(),
      this.timesheet$.selectWeekDate()
    ),
    switchMap(([_, staff, date]) =>
      this.$svc.fetchTimeData(staff, date.toISOString().substr(0, 10))
    ),
    map(week => new SetWeekAction(week))
  );

  constructor(
    private actions$: Actions,
    private context$: StoreContextService,
    private timesheet$: StoreTimesheetService,
    private $svc: TimesheetClientService
  ) {}
}
