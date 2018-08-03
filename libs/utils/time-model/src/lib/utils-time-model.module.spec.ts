import { async, TestBed } from '@angular/core/testing';
import { UtilsTimeModelModule } from './utils-time-model.module';

describe('UtilsTimeModelModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [UtilsTimeModelModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(UtilsTimeModelModule).toBeDefined();
  });
});
