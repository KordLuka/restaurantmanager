import { createAction, props } from '@ngrx/store';
import { Restaurant } from '../data-access/entities/restaurant.model';

export const fetchRestaurants = createAction(
  '[Restaurant/API] Fetch Restaurant'
);

export const fetchRestaurantsSuccess = createAction(
  '[Restaurant/API] Fetch Restaurant Success',
  props<{ payload: Restaurant[] }>()
);

export const fetchRestaurantsFailure = createAction(
  '[Restaurant/API] Fetch Restaurant Failure',
  props<{ payload: string }>()
);
