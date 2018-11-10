import { DayInfo } from '@timetool/utils/time-model';

export interface Week {
  id: string;
  date: Date;
  timesheet: DayInfo[];
}
