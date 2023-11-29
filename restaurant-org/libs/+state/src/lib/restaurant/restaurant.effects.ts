import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as RestaurantActions from './restaurant.actions';
import { RestaurantRestService } from '../data-access/infrastructure/restaurant-rest.service';

@Injectable()
export class RestaurantEffects {
  private actions$ = inject(Actions);
  private restaurantRestService$ = inject(RestaurantRestService);

  fetchRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RestaurantActions.fetchRestaurants),
      switchMap(() =>
        this.restaurantRestService$.getAll().pipe(
          switchMap(resp => [
            RestaurantActions.fetchRestaurantsSuccess({ payload: resp }),
          ]),
          catchError(() => {
            return of(
              RestaurantActions.fetchRestaurantsFailure({
                payload: 'something went wrong',
              })
            );
          })
        )
      )
    )
  );
}
