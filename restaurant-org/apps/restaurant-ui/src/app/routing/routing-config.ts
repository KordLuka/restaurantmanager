import { Route } from '@angular/router';
import { authGuard, canDeactivateGuard } from '@restaurant-org/shared-util';

export interface RoutingConfig {
  domain: string;
  routes: (Route & {
    icon?: 'plus' | 'list';
    label?: string;
    hide?: boolean;
  })[];
}

export const routingConfigs: RoutingConfig[] = [
  {
    domain: 'restaurant',
    routes: [
      {
        path: 'list',
        icon: 'list',
        label: 'List',
        canActivate: [authGuard],
        loadComponent: async () =>
          (await import('@restaurant-org/restaurant-feature-list'))
            .RestaurantFeatureListComponent,
      },
      {
        path: 'details/:id',
        icon: 'list',
        label: 'Details',
        canActivate: [authGuard],
        loadComponent: async () =>
          (await import('@restaurant-org/restaurant-feature-details'))
            .RestaurantFeatureDetailsComponent,
      },
      {
        path: 'create',
        icon: 'plus',
        label: 'Create a new customer',
        canActivate: [authGuard],
        canDeactivate: [canDeactivateGuard],
        loadComponent: async () =>
          (await import('@restaurant-org/feature-create-edit'))
            .RestaurantFeatureCreateEditComponent,
      },
    ],
  },
  {
    domain: 'customer',
    routes: [
      {
        path: 'list',
        icon: 'list',
        label: 'List',
        canActivate: [authGuard],
        loadComponent: async () =>
          (await import('@restaurant-org/customer-feature-list'))
            .CustomerFeatureListComponent,
      },
      {
        path: 'details/:id',
        icon: 'list',
        label: 'Details',
        canActivate: [authGuard],
        loadComponent: async () =>
          (await import('@restaurant-org/customer-feature-details'))
            .CustomerFeatureDetailsComponent,
      },
    ],
  },
];
