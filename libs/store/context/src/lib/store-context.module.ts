import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import {
  contextReducer,
  initialState as contextInitialState
} from './context.reducer';
import { ContextEffects } from './context.effects';
import { StoreContextService } from './store-context.service';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: ['staff', 'goals'],
    rehydrate: true,
    removeOnUndefined: true
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('context', contextReducer, {
      initialState: contextInitialState,
      metaReducers: metaReducers
    }),
    EffectsModule.forFeature([ContextEffects])
  ],
  providers: [ContextEffects, StoreContextService]
})
export class StoreContextModule {}
