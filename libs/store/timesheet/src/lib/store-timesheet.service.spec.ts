import { TestBed, inject } from '@angular/core/testing';

import { StoreTimesheetService } from './store-timesheet.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

class MockStore {
  select(query: any) {
    if (query === 'getExpiresAt') {
      return of('expiration');
    } else if (query === 'getUser') {
      return of('user');
    }
  }
}

describe('StoreTimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreTimesheetService,
        { provide: Store, useClass: MockStore }
      ]
    });
  });

  it(
    'should be created',
    inject([StoreTimesheetService], (service: StoreTimesheetService) => {
      expect(service).toBeTruthy();
    })
  );
});
