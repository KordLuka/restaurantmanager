import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  RestaurantEffects,
  RestaurantFacade,
  fromRestaurant,
} from '@restaurant-org/state';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideEffects(RestaurantEffects),
    provideState(
      fromRestaurant.RESTAURANT_FEATURE_KEY,
      fromRestaurant.restaurantReducer
    ),
    RestaurantFacade,
    provideEffects(),
    provideStore(),
    provideEffects(),
    provideStore(),
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom(StoreDevtoolsModule.instrument()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'PLN',
    },
  ],
};
