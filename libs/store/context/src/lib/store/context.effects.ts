import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
// import {
//   ContextActionTypes
// } from './context.actions';
// import { ContextState } from './context.reducer';
// import { DataPersistence } from '@nrwl/nx';

@Injectable()
export class ContextEffects {
  // @Effect() effect$ = this.actions$.ofType(ContextActionTypes.ContextAction);

  // @Effect()
  // loadContext$ = this.dataPersistence.fetch(ContextActionTypes.LoadContext, {
  //   run: (action: LoadContext, state: ContextState) => {
  //     return new ContextLoaded(state);
  //   },

  //   onError: (action: LoadContext, error) => {
  //     console.error('Error', error);
  //   }
  // });

  constructor(
    private actions$: Actions // private dataPersistence: DataPersistence<ContextState>
  ) {}
}
