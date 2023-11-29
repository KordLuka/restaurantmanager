import { Component, inject } from '@angular/core';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { CanDeactivateComponent } from '@restaurant-org/shared-util';
import { CanDecativateDialogComponent } from '@restaurant-org/shared-ui';
import { Observable, exhaustMap, map, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'restaurant-org-restaurant-feature-create-edit',
  standalone: true,
  imports: [NgIf, AsyncPipe, CommonModule],
  templateUrl: './restaurant-feature-create-edit.component.html',
  styleUrl: './restaurant-feature-create-edit.component.scss',
})
export class RestaurantFeatureCreateEditComponent
  implements CanDeactivateComponent
{
  public dirtyOfTouched$: Observable<boolean> = of(true);

  private readonly dialog = inject(MatDialog);

  canDeactivate(): Observable<boolean> {
    return this.dirtyOfTouched$.pipe(
      map(dirtyOfTouched => !dirtyOfTouched),
      exhaustMap(canDeactivate => {
        console.log('canDeactivate: ', canDeactivate);
        return canDeactivate ? of(true) : this.openDialog();
      })
    );
  }

  openDialog(): Observable<boolean> {
    return this.dialog
      .open(CanDecativateDialogComponent)
      .afterClosed() as Observable<boolean>;
  }
}
