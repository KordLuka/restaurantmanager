import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >(undefined);

  get isLoggedIn$(): Observable<boolean> {
    return this.token.asObservable().pipe(map(e => !!e));
  }

  get token$(): Observable<string | undefined> {
    return this.token.asObservable();
  }

  constructor() {
    this.token.next('FAKE_TOKEN');
  }
}
