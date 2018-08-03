import { Today } from '@timetool/utils/time-model/src/lib';

export interface TodayTimes {
  arrive: string;
  lunch: string;
  leave: string;
}

/**
 * Interface for the 'Context' data used in
 *  - ContextState, and
 *  - contextReducer
 */
export interface ContextData {
  today: Today;
  now: Today;

  staff: string;
  expected: TodayTimes;
  goals: string[];

  touchSupported: boolean;
  hoverSupported: boolean;
  hideTimelineHelp: boolean;
  hideWeekHelp: boolean;
}
