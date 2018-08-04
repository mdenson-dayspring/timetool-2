import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  contextReducer,
  initialState as contextInitialState
} from './context.reducer';
import { ContextEffects } from './context.effects';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('context', contextReducer, {
      initialState: contextInitialState
    }),
    EffectsModule.forFeature([ContextEffects])
  ],
  providers: [ContextEffects]
})
export class StoreContextModule {}
