import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { DayInfo, HM } from '@timetool/utils/time-model/src/lib';
import { environment } from '@timetool/environment/src/lib/environment';
import { Week } from '@timetool/store/timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetClientService {
  constructor(private $http: HttpClient) {}

  fetchTimeData(staff: string, sundayDate: Date): Observable<Week> {
    return Observable.create((subscriber: Subscriber<Week>) => {
      console.log('[TimesheetService.fetchTimeData]', staff, sundayDate);
      if (staff) {
        const url =
          environment.timesheet_base_uri +
          '?staff=' +
          staff +
          '&today=' +
          sundayDate.toISOString;
        console.log('[TimesheetService.fetchTimeData] url', url);
        this.$http.get(url).subscribe({
          next: (data: any[]) => {
            const dayList = data.map((day: { [key: string]: any }) => {
              return new DayInfo(
                day.day_of_week,
                undefined,
                new HM(day.minutes)
              );
            });
            const ret = {
              id: sundayDate.toISOString(),
              date: sundayDate,
              timesheet: dayList
            } as Week;
            subscriber.next(ret);
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
}
