import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { DayInfo, HM } from '@timetool/utils/time-model/src/lib';
import { map } from 'rxjs/operators';
import { environment } from '@timetool/environment/src/lib/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetClientService {
  // Using Angular DI we use the HTTP service
  constructor(private $http: HttpClient) {}

  fetchTimeData(staff: string, weekDate: string): Observable<DayInfo[]> {
    return Observable.create((subscriber: Subscriber<DayInfo[]>) => {
      // console.info('[TimesheetService.fetchTimeData]', staff, weekDate);
      if (staff) {
        const url =
          environment.timesheet_base_uri +
          '?staff=' +
          staff +
          '&today=' +
          weekDate;
        this.$http
          .get(url)
          .subscribe({
            next: (data: any[]) => {
              const dayList = data.map((day: { [key: string]: any }) => {
                return new DayInfo(
                  day.day_of_week,
                  undefined,
                  new HM(day.minutes)
                );
              });
              subscriber.next(dayList);
              subscriber.complete();
            },
            error: _ => console.error('Could not load week.')
          });
      } else {
        subscriber.complete();
        console.warn('Staff member is not set.');
      }
    });
  }

  // private _isoDate(d: Date) {
  //   function pad(s: number): String {
  //     return (s < 10) ? '0' + s : '' + s;
  //   }
  //   return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
  // }
}
