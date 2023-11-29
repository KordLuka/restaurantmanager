import { Route } from '@angular/router';
import { createRoutes } from './routing/routing-factory';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  ...createRoutes(),
];
