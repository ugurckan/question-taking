import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Environment
import { environment } from 'src/environments/environment';

// Modules (3rd party)
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer } from '@ngrx/router-store';
import { annotation, menu, HeroIconModule } from 'ng-heroicon';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Store
import { reducers, CustomSerializer, effects } from './store';

export const metaReducers: MetaReducer<any>[] = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HeroIconModule.withIcons(
      {
        annotation,
        menu,
      },
      {
        /**
         * Child level options.
         * Non passed options will use the rootModule options.
         */
        defaultHostDisplay: 'block',
      }
    ),
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
