import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@ng-mf/data-access-user';

@Component({
  imports: [RouterModule],
  selector: 'ng-mf-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-nav">Admin Dashboard</div>
    @if (isLoggedIn()) {
      <div>
        You are authenticated so you can see this content.
      </div>
    } @else {
      <router-outlet></router-outlet>
    }
    `,
})
export class AppComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  readonly isLoggedIn = this.userService.isUserLoggedIn;

  constructor() {
    effect(() => {
      const loggedIn = this.isLoggedIn();
      // Queue the navigation after initialNavigation blocking is completed
      setTimeout(() => {
        if (!loggedIn) {
          this.router.navigateByUrl('login');
        } else {
          this.router.navigateByUrl('');
        }
      });
    });
  }
}
