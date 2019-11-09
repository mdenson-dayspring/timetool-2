import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { NxModule } from '@nrwl/angular';
import { environment } from '@timetool/environment/src/lib/environment';
import { UtilsTimesheetClientModule } from '@timetool/utils/timesheet-client/src';
import { StoreContextModule } from '@timetool/store/context/src/lib/store-context.module';
import { StoreTimesheetModule } from '@timetool/store/timesheet/src';
import { HeaderModule } from '@timetool/ui/framework/src/lib/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HeaderModule,
    BrowserModule,
    BrowserAnimationsModule,
    UtilsTimesheetClientModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NxModule.forRoot(),
    StoreContextModule,
    StoreTimesheetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
