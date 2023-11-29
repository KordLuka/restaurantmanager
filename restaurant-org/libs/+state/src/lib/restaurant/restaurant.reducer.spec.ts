import {
  restaurantReducer,
  initialRestaurantState,
  RestaurantState,
} from './restaurant.reducer';
import * as RestaurantActions from './restaurant.actions';

describe('Restaurant Reducer', () => {
  it('should handle fetchRestaurants action correctly', () => {
    const action = RestaurantActions.fetchRestaurants();
    const state: RestaurantState = restaurantReducer(undefined, action);

    expect(state.restaurantsLoading).toBe(true);
    expect(state.restaurantsError).toBeUndefined();
  });

  it('should handle fetchRestaurantsSuccess action correctly', () => {
    const mockRestaurants = [
      {
        id: '1',
        name: 'test',
        createdOn: new Date(),
      },
    ];
    const action = RestaurantActions.fetchRestaurantsSuccess({
      payload: mockRestaurants,
    });
    const state: RestaurantState = restaurantReducer(
      initialRestaurantState,
      action
    );

    expect(state.restaurants).toEqual(mockRestaurants);
    expect(state.restaurantsLoading).toBe(false);
    expect(state.restaurantsError).toBeUndefined();
  });

  it('should handle fetchRestaurantsFailure action correctly', () => {
    const error = 'Error fetching restaurants';
    const action = RestaurantActions.fetchRestaurantsFailure({
      payload: error,
    });
    const state: RestaurantState = restaurantReducer(
      initialRestaurantState,
      action
    );

    expect(state.restaurantsLoading).toBe(false);
    expect(state.restaurantsError).toEqual(error);
  });

  it('should return the current state for an unknown action', () => {
    const currentState: RestaurantState = {
      ...initialRestaurantState,
      restaurantsLoading: true,
    };
    const action: any = { type: 'UNKNOWN_ACTION' };
    const state: RestaurantState = restaurantReducer(currentState, action);

    expect(state).toEqual(currentState);
  });
});
