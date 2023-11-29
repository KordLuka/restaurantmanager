import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'restaurant-org-can-decativate-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './can-decativate-dialog.component.html',
  styleUrl: './can-decativate-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanDecativateDialogComponent {}
