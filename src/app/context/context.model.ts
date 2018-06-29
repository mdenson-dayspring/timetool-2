import { HM, Today } from '../models';

export enum DayOfWeek {
  SUN = 0,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT
}

export class TodayTimes {
  arrive = '9:00';
  lunch = '1:00';
  leave = '17:00';
}

export class Context {
  today: Today;
  now: Today;

  staff: string;
  expected: TodayTimes;
  goals: string[];

  touchSupported = false;
  hoverSupported = false;
  hideTimelineHelp = false;
  hideWeekHelp = false;

  constructor() {
    this.staff = '';
    this.expected = new TodayTimes();
    this.goals = [
      '',
      '8:00',
      '8:00',
      '8:00',
      '8:00',
      '8:00',
      ''
    ];
  }
}
