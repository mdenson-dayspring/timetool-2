import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCurrentWeekDate, selectWeekEntities } from './week.reducer';
import { WeekActions } from './week.actions';

@Injectable({
  providedIn: 'root'
})
export class StoreTimesheetService {
  constructor(private store$: Store<any>) {}

  dispatch(action: WeekActions) {
    this.store$.dispatch(action);
  }

  selectCurrentWeekDate() {
    return this.store$.pipe(
      select(selectCurrentWeekDate)
    );
  }
  selectCurrentWeekTimesheetData() {
    return this.store$.pipe(
      select(selectWeekEntities)
    );
  }
}
