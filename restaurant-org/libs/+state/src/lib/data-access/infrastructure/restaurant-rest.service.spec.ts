import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RestaurantRestService } from './restaurant-rest.service';
import { Restaurant } from '../entities/restaurant.model';

describe('RestaurantRestService', () => {
  let service: RestaurantRestService;
  let httpMock: HttpTestingController;
  const today = new Date();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantRestService],
    });
    service = TestBed.inject(RestaurantRestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all restaurants', async(() => {
    // given
    const mockRestaurants: Restaurant[] = [
      { id: '1', name: 'Restaurant A', createdOn: today },
      { id: '2', name: 'Restaurant B', createdOn: today },
    ];

    // when
    service.getAll().subscribe(restaurants => {
      expect(restaurants).toEqual(mockRestaurants);
    });
    const req = httpMock.expectOne('/assets/restaurant.json');

    // then
    expect(req.request.method).toBe('GET');
    req.flush(mockRestaurants);
  }));

  it('should get a specific restaurant by id', async(() => {
    // given
    const mockRestaurants: Restaurant[] = [
      { id: '1', name: 'Restaurant A', createdOn: today },
      { id: '2', name: 'Restaurant B', createdOn: today },
    ];

    // when
    service.get('1').subscribe(restaurant => {
      expect(restaurant).toEqual(mockRestaurants[0]);
    });
    const req = httpMock.expectOne('/assets/restaurant.json');

    // then
    expect(req.request.method).toBe('GET');
    req.flush(mockRestaurants);
  }));
});
