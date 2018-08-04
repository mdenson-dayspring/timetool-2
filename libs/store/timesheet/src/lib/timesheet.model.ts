import { DayInfo } from '@timetool/utils/time-model/src/lib';

export interface TimesheetWeek {
  // canonical date for the week displayed (Sunday)
  date: Date;
  week: DayInfo[];
}
