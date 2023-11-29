import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CustomerFacadeService } from '@restaurant-org/customer-data-access';
import { TableLayoutComponent } from '@restaurant-org/shared-ui';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Customer } from 'libs/customer/data-access/src/lib/entities/customer.model';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'restaurant-org-customer-feature-list',
  standalone: true,
  imports: [
    NgIf,
    JsonPipe,
    AsyncPipe,
    TableLayoutComponent,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [CustomerFacadeService],
  templateUrl: './customer-feature-list.component.html',
})
export class CustomerFeatureListComponent implements OnInit {
  private readonly customerFacade = inject(CustomerFacadeService);

  public readonly displayedColumns: (keyof Customer)[] = [
    'firstName',
    'lastName',
    'phoneNumber',
  ];

  public readonly vm$ = this.customerFacade.vm$;

  ngOnInit(): void {
    this.customerFacade.loadAllCustomers();
  }

  public handleRefresh(): void {
    this.customerFacade.loadAllCustomers();
  }

  public handleAdd(): void {
    // todo
  }
}
