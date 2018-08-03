import { async, TestBed } from '@angular/core/testing';
import { StoreContextModule } from './store-context.module';

describe('ContextDataModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [StoreContextModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(StoreContextModule).toBeDefined();
  });
});
