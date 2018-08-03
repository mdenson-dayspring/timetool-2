import { async, TestBed } from '@angular/core/testing';
import { StoreTimesheetModule } from './store-timesheet.module';

describe('StoreTimesheetModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [StoreTimesheetModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StoreTimesheetModule).toBeDefined();
  });
});
