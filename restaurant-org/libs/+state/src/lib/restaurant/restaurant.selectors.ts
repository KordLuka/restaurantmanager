import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  RESTAURANT_FEATURE_KEY,
  RestaurantState,
} from './restaurant.reducer';
import { ContentView } from '@restaurant-org/shared-entities';
import { Restaurant } from '../data-access/entities/restaurant.model';

export const selectRestaurantState = createFeatureSelector<RestaurantState>(
  RESTAURANT_FEATURE_KEY
);

export const selectRestaurantsView = createSelector(
  selectRestaurantState,
  (state: RestaurantState): ContentView<Restaurant[]> => ({
    content: state.restaurants,
    isLoading: state.restaurantsLoading,
    error: state.restaurantsError,
  })
);
