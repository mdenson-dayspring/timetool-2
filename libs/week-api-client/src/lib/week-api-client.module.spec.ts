import { async, TestBed } from '@angular/core/testing';
import { WeekApiClientModule } from './week-api-client.module';

describe('WeekApiClientModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [WeekApiClientModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(WeekApiClientModule).toBeDefined();
  });
});
