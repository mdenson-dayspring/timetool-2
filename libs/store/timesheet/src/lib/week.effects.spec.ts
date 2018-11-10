import { TestBed } from '@angular/core/testing';
import { WeekEffects } from './week.effects';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { TimesheetClientService } from '@timetool/utils/timesheet-client/src/lib/timesheet-client.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { FetchWeekAction, UpsertWeek } from './week.actions';
import { StoreModule } from '@ngrx/store';
import { DayInfo, HM } from '@timetool/utils/time-model/src/lib';
import { StoreContextService } from '@timetool/store/context/src';
import { StoreTimesheetService } from '@timetool/store/timesheet/src/lib/store-timesheet.service';
import { Week } from './week.model';

describe('TimesheetEffects', () => {
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        WeekEffects,
        provideMockActions(() => actions$),
        {
          provide: StoreContextService,
          useValue: jasmine.createSpyObj('StoreContextService', ['selectStaff'])
        },
        {
          provide: StoreTimesheetService,
          useValue: jasmine.createSpyObj('StoreTimesheetService', [
            'selectWeekDate'
          ])
        },
        {
          provide: TimesheetClientService,
          useValue: jasmine.createSpyObj('TimesheetClientService', [
            'fetchTimeData'
          ])
        }
      ]
    });
  });

  it('should work', () => {
    const eventAction = new FetchWeekAction();
    actions$ = hot('--a-', { a: eventAction });

    const weekToReturn: Week = {
      id: 'week1',
      date: new Date(),
      timesheet: [
        new DayInfo(1, undefined, new HM(510)),
        new DayInfo(2, undefined, new HM(456)),
        new DayInfo(3, undefined, new HM(456))
      ]
    };
    TestBed.get(TimesheetClientService).fetchTimeData.and.returnValue(
      of(weekToReturn)
    );
    const resultAction = new UpsertWeek({ week: weekToReturn });

    const staff = 'mdenson';
    const week = new Date();
    TestBed.get(StoreContextService).selectStaff.and.returnValue(of(staff));
    TestBed.get(StoreTimesheetService).selectWeekDate.and.returnValue(of(week));

    const effects$ = TestBed.get(WeekEffects);

    expect(effects$.fetchWeek$).toBeObservable(
      cold('--b', { b: resultAction })
    );
  });
});
