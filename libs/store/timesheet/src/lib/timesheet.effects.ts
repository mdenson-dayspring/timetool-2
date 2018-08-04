import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  TimesheetActionTypes, SetWeekAction,
} from './timesheet.actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TimesheetClientService } from '@timetool/utils/timesheet-client/src/lib/timesheet-client.service';

@Injectable()
export class TimesheetEffects {
  @Effect()
  fetchWeek$: Observable<Action> = this.actions$
    .pipe(
      ofType(TimesheetActionTypes.FETCH_WEEK),
      switchMap(() => this.$svc.fetchTimeData('', '')),
      map(week => new SetWeekAction(week))
    );

  constructor(
    private actions$: Actions,
    private $svc: TimesheetClientService
  ) { }
}
