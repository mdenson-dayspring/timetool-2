import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  timesheetReducer,
  initialState as timesheetInitialState
} from './store/timesheet.reducer';
import { TimesheetEffects } from './store/timesheet.effects';
import { UtilsTimesheetClientModule } from '@timetool/utils/timesheet-client/src';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('timesheet', timesheetReducer, {
      initialState: timesheetInitialState
    }),
    EffectsModule.forFeature([TimesheetEffects]),
    UtilsTimesheetClientModule
  ],
  providers: [
    TimesheetEffects
  ]
})
export class StoreTimesheetModule {}