import { ContextActions, ContextActionTypes } from './context.actions';
import { ContextData, TodayTimes } from './context.model';
import { Today, HM } from '@timetool/utils/time-model/src/lib';

/**
 * Interface to the part of the Store containing ContextState
 * and other information related to ContextData.
 */
export interface ContextState {
  readonly context: ContextData;
}

export const initialState: ContextData = {
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

    case ContextActionTypes.LOAD_PAGE:
      return updateNow(state, (action as { payload: HM }).payload);
    case ContextActionTypes.TICK:
      return updateNow(state, (action as { payload: HM }).payload);

    case ContextActionTypes.UPDATE_EXPECTED:
      return updateExpected(state, (action as { payload: TodayTimes }).payload);

    case ContextActionTypes.SET_TOUCH_DEVICE:
      return Object.assign(initialState, state, {
        touchSupported: true
      });
    case ContextActionTypes.SET_HOVER_DEVICE:
      return Object.assign(initialState, state, {
        hoverSupported: true
      });

    case ContextActionTypes.HIDE_TIMELINE_HELP:
      return Object.assign(initialState, state, {
        hideTimelineHelp: true
      });
    case ContextActionTypes.HIDE_WEEK_HELP:
      return Object.assign({}, state, {
        hideWeekHelp: true
      });

    default:
      return state;
  }
}

function updateExpected(
  context: ContextData,
  newTimes: TodayTimes
): ContextData {
  const nowHM = context.now.leave;
  context = Object.assign(initialState, context, { expected: newTimes });
  return updateNow(context, nowHM);
}

function updateSettings(
  context: ContextData,
  newSettings: ContextData
): ContextData {
  context = Object.assign(initialState, context, {
    staff: newSettings.staff,
    goals: newSettings.goals
  });
  return context;
}

function updateNow(context: ContextData, nowHM: HM): ContextData {
  return Object.assign(initialState, context, {
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
  });
}

export const getContextState = (state: ContextData) => state;
