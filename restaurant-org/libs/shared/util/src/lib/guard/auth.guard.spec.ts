import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, delay, of } from 'rxjs';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { authGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  template: '',
})
class LoginDummyComponent {}

describe('Auth guard', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginDummyComponent },
        ]),
      ],
      providers: [
        { provide: AuthService, useValue: { isLoggedIn$: jest.fn() } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
          },
        },
      ],
    });

    authService = TestBed.inject(AuthService) as AuthService;
  });

  it('should resolve', fakeAsync(() => {
    // given
    const activatedRoute = TestBed.inject(ActivatedRoute);

    // when
    const guardResp = TestBed.runInInjectionContext(() => {
      return authGuard(
        activatedRoute.snapshot,
        {} as RouterStateSnapshot
      ) as Observable<boolean>;
    });

    // then
    let guardResult = undefined;
    guardResp.pipe(delay(100)).subscribe(e => {
      guardResult = e;
    });

    tick(100);

    expect(guardResult).toBeTruthy();
  }));

  it('should resolve', fakeAsync(() => {
    // given
    jest
      .spyOn(authService as any, 'isLoggedIn$')
      .mockImplementation(() => of(false));
    const activatedRoute = TestBed.inject(ActivatedRoute);

    // when
    const guardResp = TestBed.runInInjectionContext(() => {
      return authGuard(
        activatedRoute.snapshot,
        {} as RouterStateSnapshot
      ) as Observable<boolean>;
    });

    // then
    let guardResult = undefined;
    guardResp.pipe(delay(100)).subscribe(e => {
      guardResult = e;
    });

    tick(100);

    expect(guardResult).toBeTruthy();
  }));
});
