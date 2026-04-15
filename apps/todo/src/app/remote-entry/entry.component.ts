import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [NxWelcomeComponent],
  selector: 'app-todo-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-nx-welcome></app-nx-welcome>`,
})
export class RemoteEntryComponent {}
