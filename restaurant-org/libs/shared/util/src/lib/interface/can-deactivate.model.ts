import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactivate(): Observable<boolean>;
  openDialog(): Observable<boolean>;
}
