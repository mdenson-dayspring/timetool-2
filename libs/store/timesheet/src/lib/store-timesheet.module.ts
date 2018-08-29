import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  timesheetReducer,
  initialState as timesheetInitialState
} from './timesheet.reducer';
import { TimesheetEffects } from './timesheet.effects';
import { UtilsTimesheetClientModule } from '@timetool/utils/timesheet-client/src';
import { StoreTimesheetService } from '@timetool/store/timesheet/src/lib/store-timesheet.service';
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('timesheet', timesheetReducer, {
      initialState: timesheetInitialState
    }),
    EffectsModule.forFeature([TimesheetEffects]),
    UtilsTimesheetClientModule
  ],
  providers: [TimesheetEffects, StoreTimesheetService]
})
export class StoreTimesheetModule {}
