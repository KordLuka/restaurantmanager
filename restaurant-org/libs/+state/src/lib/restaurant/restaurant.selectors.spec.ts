import {
  selectRestaurantsView,
  selectRestaurantState,
} from './restaurant.selectors';
import { initialRestaurantState, RestaurantState } from './restaurant.reducer';

describe('Restaurant Selectors', () => {
  it('should select the restaurant state', () => {
    const initialState: RestaurantState = {
      ...initialRestaurantState,
      restaurants: [
        {
          id: '1',
          name: 'test',
          createdOn: new Date(),
        },
      ],
      restaurantsLoading: true,
      restaurantsError: 'Error fetching restaurants',
    };

    const selectedState = selectRestaurantState.projector(initialState);

    expect(selectedState.restaurants).toEqual(initialState.restaurants);
    expect(selectedState.restaurantsLoading).toEqual(
      initialState.restaurantsLoading
    );
    expect(selectedState.restaurantsError).toEqual(
      initialState.restaurantsError
    );
  });

  it('should select the restaurants view', () => {
    const initialState: RestaurantState = {
      ...initialRestaurantState,
      restaurants: [
        {
          id: '1',
          name: 'test',
          createdOn: new Date(),
        },
      ],
      restaurantsLoading: true,
      restaurantsError: 'Error fetching restaurants',
    };

    const selectedView = selectRestaurantsView.projector(initialState);

    expect(selectedView.content).toEqual(initialState.restaurants);
    expect(selectedView.isLoading).toEqual(initialState.restaurantsLoading);
    expect(selectedView.error).toEqual(initialState.restaurantsError);
  });
});
