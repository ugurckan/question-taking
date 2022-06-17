import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() name: string = '';
  @Input() loadingName: string = 'Loading';
  @Input() loading: boolean | null = false;
  @Input() disabled: boolean | null = false;
}
