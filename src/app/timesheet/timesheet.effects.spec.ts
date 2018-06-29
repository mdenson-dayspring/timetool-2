import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TimesheetEffects } from './timesheet.effects';

describe('TimesheetService', () => {
  let actions$: Observable<any>;
  let effects: TimesheetEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimesheetEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TimesheetEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
