import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CustomerRestService } from './customer-rest.service';
import { mockCutomerList } from './../mocks/customerMocks';

describe('BooksService', () => {
  let service: CustomerRestService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CustomerRestService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call getAllBooks and return an array of Books', async(() => {
    // given
    const url = '/assets/customers.json';

    // then
    service.getAll().subscribe(res => {
      expect(res).toEqual(mockCutomerList);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });

    req.flush(mockCutomerList);
  }));
});
