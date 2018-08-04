import { TimesheetActions, TimesheetActionTypes } from './timesheet.actions';
import { TimesheetWeek } from './timesheet.model';
import { DayInfo } from '@timetool/utils/time-model/src/lib';

export const initialState: TimesheetWeek = {
  date: undefined,
  week: undefined
} as TimesheetWeek;

export function timesheetReducer(
  state = initialState,
  action: TimesheetActions
): TimesheetWeek {
  switch (action.type) {
    case TimesheetActionTypes.RESET_WEEK:
      const actionDate = (action as { payload: Date }).payload;
      if (!state.date || state.date !== actionDate) {
        return Object.assign({}, state, {
          date: actionDate,
          week: undefined
        });
      } else {
        return state;
      }

    case TimesheetActionTypes.SET_WEEK:
      return Object.assign({}, state, {
        week: (action as { payload: DayInfo[] }).payload
      });

    default:
      return state;
  }
}
