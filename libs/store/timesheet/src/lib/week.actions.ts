import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Week } from './week.model';

export enum WeekActionTypes {
  SetCurrentWeek = '[Week] Set Current Week',
  FetchWeek = '[Week] Fetch week from Timesheet.',

  LoadWeeks = '[Week] Load Weeks',
  AddWeek = '[Week] Add Week',
  UpsertWeek = '[Week] Upsert Week',
  AddWeeks = '[Week] Add Weeks',
  UpsertWeeks = '[Week] Upsert Weeks',
  UpdateWeek = '[Week] Update Week',
  UpdateWeeks = '[Week] Update Weeks',
  DeleteWeek = '[Week] Delete Week',
  DeleteWeeks = '[Week] Delete Weeks',
  ClearWeeks = '[Week] Clear Weeks'
}

export class FetchWeekAction implements Action {
  public payload: any;
  type = WeekActionTypes.FetchWeek;
}

export class SetCurrentWeekAction implements Action {
  readonly type = WeekActionTypes.SetCurrentWeek;
  public payload: Date;

  // payload is the date of the Monday of the week
  constructor(payload: Date = new Date()) {
    this.payload = new Date(_canonicalDate(payload));
  }
}

export class LoadWeeks implements Action {
  readonly type = WeekActionTypes.LoadWeeks;

  constructor(public payload: { weeks: Week[] }) {}
}

export class AddWeek implements Action {
  readonly type = WeekActionTypes.AddWeek;

  constructor(public payload: { week: Week }) {}
}

export class UpsertWeek implements Action {
  readonly type = WeekActionTypes.UpsertWeek;

  constructor(public payload: { week: Week }) {}
}

export class AddWeeks implements Action {
  readonly type = WeekActionTypes.AddWeeks;

  constructor(public payload: { weeks: Week[] }) {}
}

export class UpsertWeeks implements Action {
  readonly type = WeekActionTypes.UpsertWeeks;

  constructor(public payload: { weeks: Week[] }) {}
}

export class UpdateWeek implements Action {
  readonly type = WeekActionTypes.UpdateWeek;

  constructor(public payload: { week: Update<Week> }) {}
}

export class UpdateWeeks implements Action {
  readonly type = WeekActionTypes.UpdateWeeks;

  constructor(public payload: { weeks: Update<Week>[] }) {}
}

export class DeleteWeek implements Action {
  readonly type = WeekActionTypes.DeleteWeek;

  constructor(public payload: { id: string }) {}
}

export class DeleteWeeks implements Action {
  readonly type = WeekActionTypes.DeleteWeeks;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearWeeks implements Action {
  readonly type = WeekActionTypes.ClearWeeks;
}

export type WeekActions =
  | FetchWeekAction
  | SetCurrentWeekAction
  | LoadWeeks
  | AddWeek
  | UpsertWeek
  | AddWeeks
  | UpsertWeeks
  | UpdateWeek
  | UpdateWeeks
  | DeleteWeek
  | DeleteWeeks
  | ClearWeeks;

function _canonicalDate(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
}
