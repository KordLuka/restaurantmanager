import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RestaurantFacade } from '@restaurant-org/state';
import { MatTableModule } from '@angular/material/table';
import { TableLayoutComponent } from '@restaurant-org/shared-ui';
import { tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'restaurant-org-restaurant-feature-list',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    TableLayoutComponent,
    RouterModule,
  ],
  providers: [],
  templateUrl: './restaurant-feature-list.component.html',
})
export class RestaurantFeatureListComponent implements OnInit {
  private router = inject(Router);
  private facade = inject(RestaurantFacade);

  public readonly view$ = this.facade.restaurantsView$.pipe(
    tap(e => console.log(e))
  );

  public readonly displayedColumns: string[] = ['id', 'name', 'createdOn'];

  ngOnInit(): void {
    this.facade.fetchRestaurants();
  }

  public handleRefresh(): void {
    this.facade.fetchRestaurants();
  }

  public handlAddRestaurant(): void {
    this.router.navigate(['/restaurant/create']);
  }
}
