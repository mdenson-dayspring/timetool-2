/**
 * Created by mdenson on 12/11/2015.
 */
import { HM } from './hourminute.model';
import { DayOfWeek } from './today.model';

export class DayInfo {
  dayOfWeek: DayOfWeek;
  name: string;
  private _goal: HM;
  private _actual: HM;

  constructor(dayOfWeek?: DayOfWeek, goal?: string | HM, actual?: string | HM) {
    this.dayOfWeek = dayOfWeek;
    if (dayOfWeek !== undefined) {
      this.name = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ][dayOfWeek];
    }
    if (goal) {
      this.setGoal(goal);
    }
    if (actual) {
      this.setActual(actual);
    }
  }

  equals(other: DayInfo): boolean {
    return this.dayOfWeek === other.dayOfWeek &&
      this.name === other.name &&
      this._goal === other._goal &&
      this._actual === other._actual;
  }

  show(): boolean {
    return this._goal !== undefined || this._actual !== undefined;
  }

  setActual(a: string | HM) {
    if (typeof a === 'string') {
      this._actual = new HM(a);
    } else {
      this._actual = a;
    }
  }
  get actual(): HM {
    return this._actual;
  }

  setGoal(g: string | HM) {
    if (typeof g === 'string') {
      this._goal = new HM(g);
    } else {
      this._goal = g;
    }
  }
  get goal(): HM {
    return this._goal;
  }

  getHours(estimate = false): string {
    if (estimate && this._goal) {
      return ('     ' + this._goal.toString()).substr(-5);
    } else if (!estimate && this._actual) {
      return ('     ' + this._actual.toString()).substr(-5);
    }

    return undefined;
  }
  getDiff(estimate = false): string {
    if (this.show) {
      if (!estimate && this._actual && this._goal) {
        return this._actual.sub(this._goal).toString('', '');
      } else {
        return undefined;
      }
    }

    return undefined;
  }
  getDiffSign(estimate = false): number {
    if (this.show) {
      if (!estimate && this._actual) {
        return this._actual.sub(this._goal).sign();
      }
    }

    return 0;
  }

  toString(estimate = false): string {
    const name = (this.name + '         ').substr(0, 9);
    const actual = this.getHours(estimate);
    let diff = this.getDiff(estimate);
    if (!diff) {
      diff = ' _____';
    }
    return name + ' ' + actual + ' ' + diff;
  }
}
