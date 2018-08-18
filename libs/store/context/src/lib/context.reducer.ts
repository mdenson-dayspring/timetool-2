import { ContextActions, ContextActionTypes } from './context.actions';
import { ContextData, TodayTimes } from './context.model';
import { Today, HM } from '@timetool/utils/time-model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const initialState: ContextData = {
  tick: undefined,

  staff: '',
  expected: {
    arrive: '9:00',
    lunch: '1:00',
    leave: '17:00'
  } as TodayTimes,

  goals: ['', '8:00', '8:00', '8:00', '8:00', '8:00', ''],

  touchSupported: false,
  hoverSupported: false,
  hideTimelineHelp: false,
  hideWeekHelp: false
} as ContextData;

export function contextReducer(
  state = initialState,
  action: ContextActions
): ContextData {
  switch (action.type) {
    case ContextActionTypes.UPDATE_SETTINGS:
      return updateSettings(
        state,
        (action as { payload: ContextData }).payload
      );

    case ContextActionTypes.START_CLOCK:
    case ContextActionTypes.TICK:
      return updateNow(state, (action as { payload: HM }).payload);

    case ContextActionTypes.UPDATE_EXPECTED:
      return updateExpected(state, (action as { payload: TodayTimes }).payload);

    case ContextActionTypes.SET_TOUCH_DEVICE:
      return { ...state, ...{ touchSupported: true } };

    case ContextActionTypes.SET_HOVER_DEVICE:
      return { ...state, ...{ hoverSupported: true } };

    case ContextActionTypes.HIDE_TIMELINE_HELP:
      return { ...state, ...{ hideTimelineHelp: true } };

    case ContextActionTypes.HIDE_WEEK_HELP:
      return { ...state, ...{ hideWeekHelp: true } };

    default:
      return state;
  }
}

function updateExpected(
  state: ContextData,
  newTimes: TodayTimes
): ContextData {
  const nowHM = state.now.leave;
  state = { ...state, ...{ expected: newTimes } };
  return updateNow(state, nowHM);
}

function updateSettings(
  state: ContextData,
  newSettings: ContextData
): ContextData {
  return {
    ...state, ...{
      staff: newSettings.staff,
      goals: newSettings.goals
    }
  };
}

function updateNow(context: ContextData, nowHM: HM): ContextData {
  return {
    ...context, ...{
      tick: nowHM,
      today: new Today(
        new HM(context.expected.arrive),
        new HM(context.expected.lunch),
        new HM(context.expected.leave)
      ),
      now: new Today(
        new HM(context.expected.arrive),
        new HM(context.expected.lunch),
        nowHM
      )
    }
  };
}

export const getContextDataState = createFeatureSelector('context');

export const selectLastTick = createSelector(
  getContextDataState,
  (state: ContextData) => state.tick
);
export const selectStaff = createSelector(
  getContextDataState,
  (state: ContextData) => state.staff
);
