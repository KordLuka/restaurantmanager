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
        path: 'customer',
        icon: 'list',
        label: 'Customer List',
        canActivate: [authGuard],
        loadComponent: async () =>
          (await import('@restaurant-org/customer-feature-list'))
            .CustomerFeatureListComponent,
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
];
