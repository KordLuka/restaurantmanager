import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { routingConfigs } from './routing/routing-config';
@Component({
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  selector: 'restaurant-org-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  routingConfigs = routingConfigs;
}
