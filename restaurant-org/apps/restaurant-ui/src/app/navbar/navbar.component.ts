import { Component, Input } from '@angular/core';
import { RoutingConfig } from '../routing/routing-config';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CapitalizePipe } from '@restaurant-org/shared-ui';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'restaurant-org-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    RouterModule,
    CapitalizePipe,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input({ required: true }) routingConfigs!: RoutingConfig[];

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
