import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TimesheetActionTypes, SetWeekAction } from './timesheet.actions';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { TimesheetClientService } from '@timetool/utils/timesheet-client';
import { selectStaff } from '@timetool/store/context';

@Injectable()
export class TimesheetEffects {
  @Effect()
  fetchWeek$: Observable<Action> = this.actions$.pipe(
    ofType(TimesheetActionTypes.FETCH_WEEK),
    withLatestFrom(this.store$.select(selectStaff)),
    switchMap(([_, staff]) => this.$svc.fetchTimeData(staff, '')),
    map(week => new SetWeekAction(week))
  );

  constructor(
    private actions$: Actions,
    private store$: Store<any>,
    private $svc: TimesheetClientService
  ) {}
}
