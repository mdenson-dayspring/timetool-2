import { timesheetReducer, initialState } from './timesheet.reducer';
import { SetWeekAction } from '@timetool/store/timesheet/src/lib/store/timesheet.actions';
import { TimesheetWeek } from '@timetool/store/timesheet/src/lib/store/timesheet.model';

describe('timesheetReducer', () => {
  it('should work', () => {
    const expectedState: TimesheetWeek = {
      date: undefined,
      week: []
    } as TimesheetWeek;

    const action: SetWeekAction = new SetWeekAction([]);
    const actual = timesheetReducer(initialState, action);
    expect(actual).toEqual(expectedState);
  });
});
