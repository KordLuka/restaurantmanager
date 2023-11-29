import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, map } from 'rxjs';
@Component({
  selector: 'restaurant-org-restaurant-feature-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-feature-details.component.html',
  styleUrl: './restaurant-feature-details.component.css',
})
export class RestaurantFeatureDetailsComponent {}
