import { TestBed, waitForAsync } from '@angular/core/testing';
import { CustomerFacadeService } from './customer-facade.service';
import { CustomerRestService } from '../infrastructure/customer-rest.service';
import { ContentView } from '@restaurant-org/shared-entities';
import { of, throwError } from 'rxjs';
import { mockCutomerList } from '../mocks/customerMocks';
import { Customer } from '../entities/customer.model';

describe('CustomerFacadeService', () => {
  let customerFacadeService: CustomerFacadeService;
  let customerRestServiceMock = {
    getAll: jest.fn(),
  } as any as jest.Mocked<CustomerRestService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerFacadeService,
        { provide: CustomerRestService, useValue: customerRestServiceMock },
      ],
    });

    customerFacadeService = TestBed.inject(CustomerFacadeService);
  });

  it('should be created', () => {
    expect(customerFacadeService).toBeTruthy();
  });

  describe('loadAllCustomers', () => {
    it('should load all customers successfully', waitForAsync(() => {
      const mockCustomers = mockCutomerList;
      customerRestServiceMock.getAll.mockReturnValue(of(mockCustomers));

      customerFacadeService.loadAllCustomers();

      customerFacadeService.vm$.subscribe((view: ContentView<Customer[]>) => {
        expect(view.content).toEqual(mockCutomerList);
        expect(view.isLoading).toBe(false);
        expect(view.error).toBeUndefined();
      });
    }));

    it('should handle error while loading customers', waitForAsync(() => {
      const errorMessage = 'something went wrong';
      customerRestServiceMock.getAll.mockReturnValue(throwError(errorMessage));

      customerFacadeService.loadAllCustomers();

      customerFacadeService.vm$.subscribe((view: ContentView<Customer[]>) => {
        expect(view.content).toEqual([]);
        expect(view.isLoading).toBe(false);
        expect(view.error).toEqual(errorMessage);
      });
    }));
  });
});
