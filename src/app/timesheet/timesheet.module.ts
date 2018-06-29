import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { TimesheetEffects } from './timesheet.effects';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([TimesheetEffects])
  ],
  declarations: []
})
export class TimesheetModule { }
