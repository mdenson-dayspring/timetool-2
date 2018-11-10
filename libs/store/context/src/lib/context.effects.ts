import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, filter, withLatestFrom, tap } from 'rxjs/operators';
import { interval, fromEvent } from 'rxjs';
import { HM } from '@timetool/utils/time-model';
import {
  TickAction,
  SetTouchDeviceSupportAction,
  SetHoverDeviceSupportAction
} from './context.actions';
import { ContextData } from './context.model';
import { Store, select } from '@ngrx/store';
import { selectLastTick } from './context.reducer';

@Injectable()
export class ContextEffects {
  //  These really only need to be done once. Don't need to keep listening.
  @Effect()
  touchTest$ = fromEvent(window, 'touchstart').pipe(
    tap(() => console.log('Setting touch supported')),
    map(e => new SetTouchDeviceSupportAction())
  );
  @Effect()
  hoverTest$ = fromEvent(window, 'mouseover').pipe(
    tap(() => console.log('Setting hover supported')),
    map(e => new SetHoverDeviceSupportAction())
  );

  @Effect()
  heartbeat$ = interval(1000).pipe(
    map(() => HM.Now()),
    withLatestFrom(this.store$.pipe(select(selectLastTick))),
    filter(([now, last]) => !last || !last.equals(now)),
    map(([now, _]) => {
      return new TickAction(now);
    })
  );

  constructor(private actions$: Actions, private store$: Store<ContextData>) {}
}
