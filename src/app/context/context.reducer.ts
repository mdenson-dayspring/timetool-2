import { Action } from '@ngrx/store';
import { ContextActions, ContextActionTypes } from './context.actions';
import { Context, Today, HM, TodayTimes } from '../models';

export interface State {
  context: Context;
}

export const initialState: State = {
  context: new Context()
};

export function reducer(state = initialState, action: ContextActions): State {
  switch (action.type) {
    case ContextActionTypes.LOAD_PAGE:
      return Object.assign({}, state, {
        context: updateNow(state.context, (action as { payload: HM }).payload)
      });
    case ContextActionTypes.TICK:
      return Object.assign({}, state, {
        context: updateNow(state.context, (action as { payload: HM }).payload)
      });

    case ContextActionTypes.UPDATE_EXPECTED:
      return Object.assign({}, state, {
        context: updateExpected(
          state.context,
          (action as { payload: TodayTimes }).payload
        )
      });

    case ContextActionTypes.UPDATE_SETTINGS:
      return Object.assign({}, state, {
        context: updateSettings(
          state.context,
          (action as { payload: Context }).payload
        )
      });

    case ContextActionTypes.SET_TOUCH_DEVICE:
      return Object.assign({}, state, {
        context: Object.assign(
          new Context(),
          state.context,
          { touchSupported: true }
        )
      });
    case ContextActionTypes.SET_HOVER_DEVICE:
      return Object.assign({}, state, {
        context: Object.assign(
          new Context(),
          state.context,
          { hoverSupported: true }
        )
      });

    case ContextActionTypes.HIDE_TIMELINE_HELP:
      return Object.assign({}, state, {
        context: Object.assign(
          new Context(),
          state.context,
          { hideTimelineHelp: true }
        )
      });
    case ContextActionTypes.HIDE_WEEK_HELP:
      return Object.assign({}, state, {
        context: Object.assign(
          new Context(),
          state.context,
          { hideWeekHelp: true }
        )
      });

    default:
      return state;
  }
}

function updateExpected(context: Context, newTimes: TodayTimes): Context {
  const nowHM = context.now.leave;
  context = Object.assign(new Context(), context, { expected: newTimes });
  return updateNow(context, nowHM);
}

function updateSettings(context: Context, newSettings: Context): Context {
  context = Object.assign(
    new Context(),
    context,
    {
      staff: newSettings.staff,
      goals: newSettings.goals
    });
  return context;
}

function updateNow(context: Context, nowHM: HM): Context {
  return Object.assign(new Context(), context, {
    today: new Today(
      new HM(context.expected.arrive),
      new HM(context.expected.lunch),
      new HM(context.expected.leave)),
    now: new Today(
      new HM(context.expected.arrive),
      new HM(context.expected.lunch),
      nowHM)
  });
}

export const getContextState = (state: State) => state;
export const getContext = (state: State) => state.context;
