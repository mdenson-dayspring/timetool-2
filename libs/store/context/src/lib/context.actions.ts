import { Action } from '@ngrx/store';
import { HM } from '@timetool/utils/time-model';
import { ContextData, TodayTimes } from './context.model';

export enum ContextActionTypes {
  START_CLOCK = '[Startup] Clock',
  TICK = '[Interval] Tick',
  UPDATE_EXPECTED = '[Context] Update Expected Times',
  UPDATE_SETTINGS = '[Context] Update Settings',
  SET_TOUCH_DEVICE = '[Context] Set the flag for device supports touch.',
  SET_HOVER_DEVICE = '[Context] Set the flag for device supports hover.',
  HIDE_TIMELINE_HELP = '[Context] Hide Timeline Help',
  HIDE_WEEK_HELP = '[Context] Hide Week Help'
}

export class TickAction implements Action {
  readonly type = ContextActionTypes.TICK;
  constructor(public payload: HM) {}
}
export class StartClockAction implements Action {
  readonly type = ContextActionTypes.START_CLOCK;
  constructor(public payload: HM) {}
}

export class UpdateExpectedAction implements Action {
  readonly type = ContextActionTypes.UPDATE_EXPECTED;
  constructor(public payload: TodayTimes) {}
}

export class UpdateSettingsAction implements Action {
  readonly type = ContextActionTypes.UPDATE_SETTINGS;
  constructor(public payload: ContextData) {}
}

export class SetTouchDeviceSupportAction implements Action {
  readonly type = ContextActionTypes.SET_TOUCH_DEVICE;
}
export class SetHoverDeviceSupportAction implements Action {
  readonly type = ContextActionTypes.SET_HOVER_DEVICE;
}

export class HideTimelineHelpAction implements Action {
  readonly type = ContextActionTypes.HIDE_TIMELINE_HELP;
}
export class HideWeekHelpAction implements Action {
  readonly type = ContextActionTypes.HIDE_WEEK_HELP;
}

export type ContextActions =
  | StartClockAction
  | TickAction
  | UpdateExpectedAction
  | UpdateSettingsAction
  | SetTouchDeviceSupportAction
  | SetHoverDeviceSupportAction
  | HideTimelineHelpAction
  | HideWeekHelpAction;
