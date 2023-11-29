import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, filter, map, Observable } from 'rxjs';
import { Restaurant } from '../entities/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantRestService {
  private http = inject(HttpClient);

  public getAll(): Observable<Restaurant[]> {
    return this.http
      .get<Restaurant[]>('/assets/restaurant.json')
      .pipe(delay(3000));
  }

  public get(id: string): Observable<Restaurant> {
    return this.getAll().pipe(
      map(restaurants => restaurants.find(c => c.id === id)),
      filter((restaurant): restaurant is Restaurant => !!restaurant)
    );
  }
}
