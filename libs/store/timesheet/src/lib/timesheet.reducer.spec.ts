import { timesheetReducer, initialState } from './timesheet.reducer';
import { SetWeekAction } from './timesheet.actions';
import { TimesheetWeek } from './timesheet.model';

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
