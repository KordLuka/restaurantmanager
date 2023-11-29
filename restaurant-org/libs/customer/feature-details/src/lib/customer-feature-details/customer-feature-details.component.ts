import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomerFacadeService } from '@restaurant-org/customer-data-access';
import { exhaustMap, map, tap } from 'rxjs';
@Component({
  selector: 'restaurant-org-customer-feature-details',
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe, CommonModule],
  providers: [CustomerFacadeService],
  templateUrl: './customer-feature-details.component.html',
  styleUrl: './customer-feature-details.component.css',
})
export class CustomerFeatureDetailsComponent {
  private readonly facade = inject(CustomerFacadeService);
  private readonly activatedRoute = inject(ActivatedRoute);

  public readonly id$ = this.activatedRoute.params.pipe(
    tap(e=>console.log(e)),
    tap(e => this.facade.loadCustomer(e['id']))
  );

  public readonly customerVm$ = this.facade.customerVm$.pipe(
    tap(e => console.log(e))
  );
}
