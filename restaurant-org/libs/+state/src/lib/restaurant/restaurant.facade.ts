import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as RestaurantActions from './restaurant.actions';
import * as RestaurantSelectors from './restaurant.selectors';

@Injectable()
export class RestaurantFacade {
  private readonly store = inject(Store);

  public readonly restaurantsView$ = this.store.pipe(
    select(RestaurantSelectors.selectRestaurantsView)
  );

  public fetchRestaurants(): void {
    this.store.dispatch(RestaurantActions.fetchRestaurants());
  }
}
