import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RestaurantActions from './restaurant.actions';
import { RestaurantEntity } from './restaurant.models';
import { Restaurant } from '../data-access/entities/restaurant.model';

export const RESTAURANT_FEATURE_KEY = 'restaurant';

export interface RestaurantState extends EntityState<RestaurantEntity> {
  restaurants?: Restaurant[];
  restaurantsLoading: boolean;
  restaurantsError?: string;
}

export interface RestaurantPartialState {
  readonly [RESTAURANT_FEATURE_KEY]: RestaurantState;
}

export const restaurantAdapter: EntityAdapter<RestaurantEntity> =
  createEntityAdapter<RestaurantEntity>();

export const initialRestaurantState: RestaurantState =
  restaurantAdapter.getInitialState({
    restaurants: undefined,
    restaurantsLoading: false,
    restaurantsError: undefined,
  });

const reducer = createReducer(
  initialRestaurantState,
  on(RestaurantActions.fetchRestaurants, state => ({
    ...state,
    restaurantsLoading: true,
    restaurantsError: undefined,
  })),
  on(RestaurantActions.fetchRestaurantsSuccess, (state, { payload }) => ({
    ...state,
    restaurants: payload,
    restaurantsLoading: false,
    restaurantsError: undefined,
  })),
  on(RestaurantActions.fetchRestaurantsFailure, (state, { payload }) => ({
    ...state,
    restaurantsLoading: false,
    restaurantsError: payload,
  }))
);

export function restaurantReducer(
  state: RestaurantState | undefined,
  action: Action
) {
  return reducer(state, action);
}
