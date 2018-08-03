import { Action } from '@ngrx/store';
import { DayInfo } from '@timetool/utils/time-model/src/lib';

export enum TimesheetActionTypes {
  RESET_WEEK = '[Timesheet] Reset the Timesheet slice',
  SET_WEEK = '[Timesheet] Update store with week info.',
  FETCH_WEEK = '[Expense] Fetch week from Timesheet.'
}

export class ResetWeekAction implements Action {
  readonly type = TimesheetActionTypes.RESET_WEEK;
  public payload: Date;

  // payload is the date of the Monday? of the week
  constructor(payload: Date = new Date()) {
    this.payload = new Date(_canonicalDate(payload));
  }
}

export class SetWeekAction implements Action {
  readonly type = TimesheetActionTypes.SET_WEEK;

  constructor(public payload: DayInfo[]) {}
}

export class FetchWeekAction implements Action {
  type = TimesheetActionTypes.FETCH_WEEK;
}

export type TimesheetActions =
  | ResetWeekAction
  | SetWeekAction
  | FetchWeekAction;

function _canonicalDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
}
