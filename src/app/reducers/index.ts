import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTimesheet from '../timesheet/timesheet.reducer';
import * as fromContext from '../context/context.reducer';
export interface State {
  timesheet: fromTimesheet.State;
  context: fromContext.State;
}

export const reducers: ActionReducerMap<State> = {
  timesheet: fromTimesheet.reducer,
  context: fromContext.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getContextState = (state: State) => state.context;
export const getContext = createSelector(getContextState, fromContext.getContext);

export const getTimesheetState = (state: State) => state.timesheet;
