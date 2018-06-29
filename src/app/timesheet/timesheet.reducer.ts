import { Action } from '@ngrx/store';
import { TimesheetActions, TimesheetActionTypes } from './timesheet.actions';
import { DayInfo, TimesheetWeek } from '../models';

export type State = TimesheetWeek;

export const initialState: State = {
  date: undefined,
  week: undefined
};

export function reducer(state = initialState, action: TimesheetActions): State {
  switch (action.type) {
    case TimesheetActionTypes.RESET_WEEK:
      const actionDate = (action as {payload: Date}).payload;
      if (!state.date ||
          state.date !== actionDate) {
        return Object.assign({}, state, {
          date: actionDate,
          week: undefined
        });
      } else {
        return state;
      }

    case TimesheetActionTypes.SET_WEEK:
      return Object.assign({}, state, {
        week: (action as {payload: DayInfo[]}).payload
      });


    default:
      return state;
  }
}
