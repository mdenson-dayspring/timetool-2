// import { TestBed } from '@angular/core/testing';
// import { StoreModule } from '@ngrx/store';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { DataPersistence } from '@nrwl/nx';
// import { hot } from '@nrwl/nx/testing';

// import { ContextEffects } from './context.effects';
// import { LoadContext, ContextLoaded } from './context.actions';

// import { Observable } from 'rxjs';

// describe('ContextEffects', () => {
//   let actions$: Observable<any>;
//   let effects$: ContextEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [StoreModule.forRoot({})],
//       providers: [
//         ContextEffects,
//         DataPersistence,
//         provideMockActions(() => actions$)
//       ]
//     });

//     effects$ = TestBed.get(ContextEffects);
//   });

//   describe('someEffect', () => {
//     it('should work', () => {
//       actions$ = hot('-a-|', { a: new LoadContext({}) });
//       expect(effects$.loadContext$).toBeObservable(
//         hot('-a-|', { a: new ContextLoaded({}) })
//       );
//     });
//   });
// });
