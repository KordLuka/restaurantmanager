import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'restaurant-org-table-layout',
  standalone: true,
  imports: [MatProgressBarModule, MatButtonModule, MatIconModule],
  template: `
    <div
      class="w-full p-2 rounded-lg shadow border border-gray-100 bg-white flex flex-col justify-center gap-y-2">
      <div
        class="flex items-center justify-between p-4 border-b border-gray-100">
        <h1>title</h1>

        <div class="flex items-center gap-x-4">
          <ng-content select="[menu]"> </ng-content>
          <button
            mat-icon-button
            [disabled]="isLoading"
            (click)="refresh.emit()"
            data-testid="table-layout-refresh-button">
            <mat-icon>refresh</mat-icon>
          </button>
        </div>
      </div>
      <div>
        @if (isLoading){
        <mat-progress-bar
          mode="indeterminate"
          data-testid="table-layout-progress-bar"></mat-progress-bar>
        } @else if (error) {
        <p data-testid="table-layout-error-paragraph">{{ error }}</p>
        } @else {
        <div class="flex flex-col gap-y-4" data-testid="table-layout-content">
          <ng-content select="[content]"></ng-content>
        </div>
        }
      </div>
    </div>
  `,
})
export class TableLayoutComponent {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Input({ required: true }) isLoading!: boolean;
  @Input({ required: false }) error?: string;
}
