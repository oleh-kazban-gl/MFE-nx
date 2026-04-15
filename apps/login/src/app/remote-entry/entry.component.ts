import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@ng-mf/data-access-user';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'ng-mf-login-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-app">
      <form class="login-form" [formGroup]="loginForm" (ngSubmit)="login()">
        <label>
          Username:
          <input type="text" formControlName="username" />
        </label>
        <label>
          Password:
          <input type="password" formControlName="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      @if (isLoggedIn()) {
        <div>User is logged in!</div>
      }
    </div>
    `,
  styles: [
    `
      .login-app {
        width: 30vw;
        border: 2px dashed black;
        padding: 8px;
        margin: 0 auto;
      }
      .login-form {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        padding: 8px;
      }
      label {
        display: block;
      }
    `,
  ],
})
export class RemoteEntryComponent {
  private readonly userService = inject(UserService);
  readonly isLoggedIn = this.userService.isUserLoggedIn;

  readonly loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  login() {
    const { username, password } = this.loginForm.getRawValue();
    this.userService.checkCredentials(username, password);
  }
}
