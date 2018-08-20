import { TestBed, inject } from '@angular/core/testing';

import { StoreTimesheetService } from './store-timesheet.service';

describe('StoreTimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreTimesheetService]
    });
  });

  it(
    'should be created',
    inject([StoreTimesheetService], (service: StoreTimesheetService) => {
      expect(service).toBeTruthy();
    })
  );
});
