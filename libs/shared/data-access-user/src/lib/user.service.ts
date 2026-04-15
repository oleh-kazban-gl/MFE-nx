import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _isUserLoggedIn = signal(false);
  readonly isUserLoggedIn = this._isUserLoggedIn.asReadonly();

  checkCredentials(username: string, password: string) {
    if (username === 'demo' && password === 'demo') {
      this._isUserLoggedIn.set(true);
    }
  }

  logout() {
    this._isUserLoggedIn.set(false);
  }
}
