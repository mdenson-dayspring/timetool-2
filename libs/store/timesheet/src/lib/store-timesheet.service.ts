import { Injectable } from '@angular/core';
import { TimesheetActions } from '@timetool/store/timesheet/src/lib/timesheet.actions';
import { Store } from '@ngrx/store';
import { selectWeekDate } from '@timetool/store/timesheet/src/lib/timesheet.reducer';

@Injectable({
  providedIn: 'root'
})
export class StoreTimesheetService {
  constructor(private store$: Store<any>) {}

  dispatch(action: TimesheetActions) {
    this.store$.dispatch(action);
  }

  selectWeekDate() {
    return this.store$.select(selectWeekDate);
  }
}
