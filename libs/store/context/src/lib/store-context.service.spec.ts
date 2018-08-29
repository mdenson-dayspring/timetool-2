import { TestBed, inject } from '@angular/core/testing';

import { StoreContextService } from './store-context.service';
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

describe('StoreContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreContextService,
        { provide: Store, useClass: MockStore }
      ]
    });
  });

  it(
    'should be created',
    inject([StoreContextService], (service: StoreContextService) => {
      expect(service).toBeTruthy();
    })
  );
});
