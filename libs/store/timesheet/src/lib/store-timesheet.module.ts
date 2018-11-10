import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeekEffects } from './week.effects';
import { UtilsTimesheetClientModule } from '@timetool/utils/timesheet-client/src';
import { StoreTimesheetService } from '@timetool/store/timesheet/src/lib/store-timesheet.service';
import * as fromWeek from './week.reducer';
@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([WeekEffects]),
    UtilsTimesheetClientModule,
    StoreModule.forFeature('week', fromWeek.reducer)
  ],
  providers: [WeekEffects, StoreTimesheetService]
})
export class StoreTimesheetModule {}
