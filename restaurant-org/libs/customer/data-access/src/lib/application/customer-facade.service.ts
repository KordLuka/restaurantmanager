import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Customer } from '../entities/customer.model';
import { Observable, exhaustMap, of, tap } from 'rxjs';
import { CustomerRestService } from '../infrastructure/customer-rest.service';
import { ContentView } from '@restaurant-org/shared-entities';

interface State {
  customers: Customer[];
  customersLoading: boolean;
  customersError?: string;

  customer?: Customer;
  customerLoading: boolean;
  customerError?: string;
}

@Injectable()
export class CustomerFacadeService extends ComponentStore<State> {
  private readonly customerRestService = inject(CustomerRestService);
  private customers$ = this.select(s => s.customers);
  private customersLoading$ = this.select(s => s.customersLoading);
  private customersError$ = this.select(s => s.customersError);

  private customer$ = this.select(s => s.customer);
  private customerLoading$ = this.select(s => s.customerLoading);
  private customerError$ = this.select(s => s.customerError);

  public vm$: Observable<ContentView<Customer[]>> = this.select({
    content: this.customers$,
    isLoading: this.customersLoading$,
    error: this.customersError$,
  });

  public customerVm$: Observable<ContentView<Customer | undefined>> =
    this.select({
      content: this.customer$,
      isLoading: this.customerLoading$,
      error: this.customerError$,
    });

  constructor() {
    super({
      customers: [],
      customersLoading: false,
      customersError: undefined,
      customer: undefined,
      customerLoading: false,
      customerError: undefined,
    });
  }

  public readonly loadAllCustomers = this.effect<void>(trigger$ =>
    trigger$.pipe(
      tap(() =>
        this.patchState({ customersLoading: true, customersError: undefined })
      ),
      exhaustMap(() => this.customerRestService.getAll()),
      tapResponse(
        resp => this.patchState({ customers: resp, customersLoading: false }),
        error =>
          this.patchState({
            customersLoading: false,
            customersError: 'something went wrong',
          })
      )
    )
  );

  public readonly loadCustomer = this.effect<string>(id$ =>
    id$.pipe(
      tap(() =>
        this.patchState({ customerLoading: true, customerError: undefined })
      ),
      exhaustMap(id =>
        this.select(({ customers }) => customers.find(c => c.id === id)).pipe(
          exhaustMap((customer: Customer | undefined) =>
            customer ? of(customer) : this.customerRestService.getOne(id)
          )
        )
      ),
      tapResponse(
        resp => this.patchState({ customer: resp, customerLoading: false }),
        error =>
          this.patchState({
            customerLoading: false,
            customerError: 'something went wrong',
          })
      )
    )
  );
}
