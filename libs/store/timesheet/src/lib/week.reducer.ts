import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Week } from './week.model';
import { WeekActions, WeekActionTypes } from './week.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Week> {
  date: Date;
}

export const adapter: EntityAdapter<Week> = createEntityAdapter<Week>();

export const initialState: State = adapter.getInitialState({
  date: undefined
});

export function reducer(state = initialState, action: WeekActions): State {
  switch (action.type) {
    case WeekActionTypes.AddWeek: {
      return adapter.addOne(action.payload.week, state);
    }

    case WeekActionTypes.UpsertWeek: {
      return adapter.upsertOne(action.payload.week, state);
    }

    case WeekActionTypes.AddWeeks: {
      return adapter.addMany(action.payload.weeks, state);
    }

    case WeekActionTypes.UpsertWeeks: {
      return adapter.upsertMany(action.payload.weeks, state);
    }

    case WeekActionTypes.UpdateWeek: {
      return adapter.updateOne(action.payload.week, state);
    }

    case WeekActionTypes.UpdateWeeks: {
      return adapter.updateMany(action.payload.weeks, state);
    }

    case WeekActionTypes.DeleteWeek: {
      return adapter.removeOne(action.payload.id, state);
    }

    case WeekActionTypes.DeleteWeeks: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case WeekActionTypes.LoadWeeks: {
      return adapter.addAll(action.payload.weeks, state);
    }

    case WeekActionTypes.ClearWeeks: {
      return adapter.removeAll(state);
    }

    case WeekActionTypes.SetCurrentWeek: {
      const actionDate = (action as { payload: Date }).payload;
      if (!state.date || state.date !== actionDate) {
        return { ...state, ...{ date: actionDate } };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectWeekIds = selectIds;
export const selectWeekEntities = selectEntities;
export const selectWeekAll = selectAll;
export const selectWeekTotal = selectTotal;

export const getWeekDataState = createFeatureSelector('week');

export const selectCurrentWeekDate = createSelector(
  getWeekDataState,
  (state: State) => state.date
);
