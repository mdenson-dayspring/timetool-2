import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { TimesheetService } from './timesheet.service';
import { TimesheetActions, TimesheetActionTypes, SetWeekAction } from './timesheet.actions';

@Injectable()
export class TimesheetEffects {

  @Effect()
  fetchWeek$: Observable<Action> = this.actions$
    .ofType(TimesheetActionTypes.FETCH_WEEK)
    .pipe(
      switchMap(() => this.$svc.fetchTimeData()),
      map(week => new SetWeekAction(week))
    );

  constructor(private actions$: Actions,
              private $svc: TimesheetService) {}
}
