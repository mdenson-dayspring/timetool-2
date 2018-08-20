import { TestBed, inject } from '@angular/core/testing';

import { StoreContextService } from './store-context.service';

describe('StoreContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreContextService]
    });
  });

  it(
    'should be created',
    inject([StoreContextService], (service: StoreContextService) => {
      expect(service).toBeTruthy();
    })
  );
});
