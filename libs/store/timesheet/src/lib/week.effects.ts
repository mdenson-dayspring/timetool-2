import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { TimesheetClientService } from '@timetool/utils/timesheet-client';
import { StoreContextService } from '@timetool/store/context/src';

import { StoreTimesheetService } from './store-timesheet.service';
import { UpsertWeek, WeekActionTypes } from './week.actions';

@Injectable()
export class WeekEffects {
  @Effect()
  fetchWeek$: Observable<Action> = this.actions$.pipe(
    ofType(WeekActionTypes.FetchWeek),
    withLatestFrom(
      this.context$.selectStaff(),
      this.timesheet$.selectCurrentWeekDate()
    ),
    filter(([_, staff, date]) => staff !== undefined && date !== undefined),
    switchMap(([_, staff, date]) => this.$svc.fetchTimeData(staff, date)),
    map(week => new UpsertWeek({ week: week }))
  );

  constructor(
    private actions$: Actions,
    private context$: StoreContextService,
    private timesheet$: StoreTimesheetService,
    private $svc: TimesheetClientService
  ) {}
}
