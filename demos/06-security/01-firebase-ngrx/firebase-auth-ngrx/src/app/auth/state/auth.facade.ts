import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, combineLatestWith } from 'rxjs/operators';
import { LoginCredentials } from '../credential.model';
import { logIn, redirectToLogin, registerUser, setUser } from './auth.actions';
import { AuthState } from './auth.reducer';
import {
  getAuthEnabled,
  getLoggedIn,
  getUser,
  hasToken,
} from './auth.selectors';
import { logOut } from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store<AuthState>) {}

  get User() {
    return this.store.select(getUser);
  }

  isAuthenticated() {
    return this.store.select(getLoggedIn).pipe(
      combineLatestWith(this.store.select(getAuthEnabled)),
      map(([loggedIn, authEnabled]) => {
        return authEnabled == false || loggedIn;
      })
    );
  }

  hasToken() {
    return this.store.select(hasToken).pipe(map((token) => token));
  }

  signIn(login: LoginCredentials) {
    this.store.dispatch(logIn({ credentials: login }));
  }

  signOut() {
    this.store.dispatch(logOut());
  }

  register(login: LoginCredentials) {
    this.store.dispatch(registerUser({ credentials: login }));
  }

  redirectToLogin() {
    this.store.dispatch(redirectToLogin());
  }

  userChanged(user: any) {
    if (user)
      user
        .getIdToken()
        .then((token: string) => this.store.dispatch(setUser({ user, token })));
  }
}
