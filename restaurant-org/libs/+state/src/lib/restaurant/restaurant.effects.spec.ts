import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';

import { RestaurantEffects } from './restaurant.effects';
import * as RestaurantActions from './restaurant.actions';
import { RestaurantRestService } from '../data-access/infrastructure/restaurant-rest.service';
import { Restaurant } from '../data-access/entities/restaurant.model';

describe('RestaurantEffects', () => {
  let actions$: Observable<any>;
  let effects: RestaurantEffects;
  let restaurantService: RestaurantRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestaurantEffects,
        provideMockActions(() => actions$),
        { provide: RestaurantRestService, useValue: { getAll: jest.fn() } },
      ],
    });

    effects = TestBed.inject(RestaurantEffects);
    restaurantService = TestBed.inject(
      RestaurantRestService
    ) as RestaurantRestService;
  });

  it('should return a fetchRestaurantsSuccess action on success', () => {
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'test',
        createdOn: new Date(),
      },
    ];
    const action = RestaurantActions.fetchRestaurants();
    const completion = RestaurantActions.fetchRestaurantsSuccess({
      payload: mockRestaurants,
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: mockRestaurants });
    jest.spyOn(restaurantService, 'getAll').mockReturnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.fetchRestaurants$).toBeObservable(expected);
  });

  it('should return a fetchRestaurantsFailure action on error', () => {
    const error = 'something went wrong';
    const action = RestaurantActions.fetchRestaurants();
    const completion = RestaurantActions.fetchRestaurantsFailure({
      payload: error,
    });

    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    jest.spyOn(restaurantService, 'getAll').mockReturnValue(response);

    const expected = cold('--b', { b: completion });
    expect(effects.fetchRestaurants$).toBeObservable(expected);
  });
});
