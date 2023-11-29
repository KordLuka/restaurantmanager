import { RestaurantFacade } from './restaurant.facade';
import * as RestaurantActions from './restaurant.actions';
import * as RestaurantSelectors from './restaurant.selectors';
import { ContentView } from '@restaurant-org/shared-entities';
import { Restaurant } from '../data-access/entities/restaurant.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { spyOn } from 'jest-mock';

describe('RestaurantFacade', () => {
  let facade: RestaurantFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantFacade, provideMockStore()],
    });

    facade = TestBed.inject(RestaurantFacade);
    store = TestBed.inject(Store) as MockStore;
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch fetchRestaurants action when calling fetchRestaurants method', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    facade.fetchRestaurants();

    expect(dispatchSpy).toHaveBeenCalledWith(
      RestaurantActions.fetchRestaurants()
    );
  });

  it('should select restaurantsView from the store', () => {
    const mockRestaurantsView: ContentView<Restaurant[]> = {
      content: [
        {
          id: '1',
          name: 'test',
          createdOn: new Date(),
        },
      ],
      isLoading: false,
      error: undefined,
    };
    const selectSpy = spyOn(store, 'select');
    store.overrideSelector(
      RestaurantSelectors.selectRestaurantsView,
      mockRestaurantsView
    );

    facade.restaurantsView$.subscribe(view => {
      expect(selectSpy).toHaveBeenCalledWith(
        RestaurantSelectors.selectRestaurantsView
      );
      expect(view).toEqual(mockRestaurantsView);
    });
  });
});
