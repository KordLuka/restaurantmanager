import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, share } from 'rxjs';
import { Customer } from '../entities/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerRestService {
  private readonly httpClient = inject(HttpClient);

  private getAllCache$!: Observable<Customer[]>;

  public getAll(): Observable<Customer[]> {
    if (!this.getAllCache$) {
      this.getAllCache$ = this.httpClient
        .get<Customer[]>('/assets/customers.json')
        .pipe(share({ connector: () => new ReplaySubject(1) }));
    }
    return this.getAllCache$;
  }
}
