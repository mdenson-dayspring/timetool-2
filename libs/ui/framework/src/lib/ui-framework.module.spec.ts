import { async, TestBed } from '@angular/core/testing';
import { UiFrameworkModule } from './ui-framework.module';

describe('UiFrameworkModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [UiFrameworkModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(UiFrameworkModule).toBeDefined();
  });
});
