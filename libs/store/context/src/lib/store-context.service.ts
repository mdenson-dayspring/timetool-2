import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ContextActions } from './context.actions';
import { selectStaff, selectLastTick } from './context.reducer';

@Injectable({
  providedIn: 'root'
})
export class StoreContextService {
  constructor(private store$: Store<any>) {}

  dispatch(action: ContextActions) {
    this.store$.dispatch(action);
  }

  selectStaff() {
    return this.store$.select(selectStaff);
  }
  selectLastTick() {
    return this.store$.select(selectLastTick);
  }
}
