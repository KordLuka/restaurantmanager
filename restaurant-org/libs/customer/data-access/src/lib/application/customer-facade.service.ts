import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Customer } from '../entities/customer.model';
import { Observable, exhaustMap, tap } from 'rxjs';
import { CustomerRestService } from '../infrastructure/customer-rest.service';
import { ContentView } from '@restaurant-org/shared-entities';

interface State {
  customers: Customer[];
  customersLoading: boolean;
  customersError?: string;
}

@Injectable()
export class CustomerFacadeService extends ComponentStore<State> {
  private readonly customerRestService = inject(CustomerRestService);
  private customers$ = this.select(s => s.customers);
  private customersLoading$ = this.select(s => s.customersLoading);
  private customersError$ = this.select(s => s.customersError);

  public vm$: Observable<ContentView<Customer[]>> = this.select({
    content: this.customers$,
    isLoading: this.customersLoading$,
    error: this.customersError$,
  });

  constructor() {
    super({
      customers: [],
      customersLoading: false,
      customersError: undefined,
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
}
