import { async, TestBed } from '@angular/core/testing';
import { UtilsTimesheetClientModule } from './utils-timesheet-client.module';

describe('UtilsTimesheetClientModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [UtilsTimesheetClientModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(UtilsTimesheetClientModule).toBeDefined();
  });
});
