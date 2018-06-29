import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import * as fromRoot from '../reducers';
import { DayInfo, HM } from '../models';
import { environment } from '../../environments/environment';

const BASE_URL = '/timesheetPHP/staff/staff_json.php';

@Injectable()
export class TimesheetService implements OnDestroy {
  private staff: string;
  private weekDate: string;
  private subs: Subscription[] = [];

  constructor(private $http: Http,
              private store: Store<fromRoot.State>) {
    // this.subs.push(store.select(fromRoot.getContext)
    //   .subscribe(context => {
    //     this.staff = context.staff;
    //   }));
    this.subs.push(store.select(fromRoot.getTimesheetState)
      .pipe(
        map(state => state.date),
        filter(date => date !== undefined)
      )
      .subscribe(date => {
        this.weekDate = this._isoDate(date);
      }));
  }

  fetchTimeData(): Observable<DayInfo[]> {
    let url = BASE_URL + '?staff=' + this.staff + '&today=' + this.weekDate;
    if (!environment.production) {
      url = 'public/data/staff.json';
    }
    return Observable.create((subscriber: Subscriber<DayInfo[]>) => {
      // console.debug('[TimesheetService.fetchTimeData]', this.staff, this.weekDate);
      if (this.staff) {
        this.$http.get(url)
          .pipe(map(response => response.json()))
          .subscribe(data => {
            const dayList = data.map((day: {[key: string]: any}) => {
              return new DayInfo(day.day_of_week, undefined, new HM(day.minutes));
            });
            subscriber.next(dayList);
            subscriber.complete();
          }, error => console.error('Could not load week.'));
      } else {
        subscriber.complete();
        console.warn('Staff member is not set.');
      }
    });
  }

  ngOnDestroy() {
    this.subs.forEach(element => {
      if (element) { element.unsubscribe(); }
    });
  }

  private _isoDate(d: Date) {
    function pad(s: number): String {
      return (s < 10) ? '0' + s : '' + s;
    }
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  }
}
