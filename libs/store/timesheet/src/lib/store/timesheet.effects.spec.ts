import { TestBed } from '@angular/core/testing';
import { TimesheetEffects } from './timesheet.effects';
import { Observable, of } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { TimesheetClientService } from '@timetool/utils/timesheet-client/src/lib/timesheet-client.service';
import { provideMockActions } from '@ngrx/effects/testing';
import { FetchWeekAction, SetWeekAction } from '@timetool/store/timesheet/src/lib/store/timesheet.actions';
import { StoreModule } from '@ngrx/store';
import { DayInfo, HM } from '@timetool/utils/time-model/src/lib';

describe('TimesheetEffects', () => {
  let effects: TimesheetEffects;
  let actions$: Observable<any>;
  let tssSpy;

  beforeEach(() => {
    tssSpy = jasmine.createSpyObj('TimesheetClientService', ['fetchTimeData']);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        TimesheetEffects,
        provideMockActions(() => actions$),
        {
          provide: TimesheetClientService,
          useValue: tssSpy
        }
      ]
    });

    effects = TestBed.get(TimesheetEffects);
  });

  it('should work', () => {
    const action = new FetchWeekAction();
    const daysToReturn: DayInfo[] = [
      new DayInfo( 1, undefined, new HM(510) ),
      new DayInfo( 2, undefined, new HM(456) ),
      new DayInfo( 3, undefined, new HM(456) )
    ];

    const completion = new SetWeekAction(daysToReturn);
    tssSpy.fetchTimeData.and.returnValue(of(daysToReturn));

    // Refer to 'Writing Marble Tests' for details on '--a-' syntax
    actions$ = hot('--a-', { a: action });
    const expected = cold('--b', { b: completion });

    expect(effects.fetchWeek$).toBeObservable(expected);
  });

});
