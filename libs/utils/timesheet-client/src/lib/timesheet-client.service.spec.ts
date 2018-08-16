import { TimesheetClientService } from './timesheet-client.service';
import { defer } from 'rxjs';
import { HM, DayInfo } from '@timetool/utils/time-model/src/lib';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('TimesheetClientService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let tsClientServive: TimesheetClientService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    tsClientServive = new TimesheetClientService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(tsClientServive).toBeTruthy();
  });

  it('should return array of days', () => {
    const receivedRaw: any[] = [
      { date: '2018-07-30', day_of_week: 1, hours: '8.50', minutes: 510 },
      { date: '2018-07-31', day_of_week: 2, hours: '7.60', minutes: 456 },
      { date: '2018-08-01', day_of_week: 3, hours: '7.60', minutes: 456 }
    ];

    const expectedDays: DayInfo[] = [
      new DayInfo(1, undefined, new HM(510)),
      new DayInfo(2, undefined, new HM(456)),
      new DayInfo(3, undefined, new HM(456))
    ];

    httpClientSpy.get.and.returnValue(asyncData(receivedRaw));

    tsClientServive
      .fetchTimeData('mdenson', '')
      .subscribe(
        list => expect(list).toEqual(expectedDays, 'expected day information'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
