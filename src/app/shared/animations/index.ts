import {
  style,
  state,
  trigger,
  animate,
  transition,
} from '@angular/animations';

export const animations = [
  trigger('fadeInOut', [
    state(
      '0, void',
      style({
        opacity: 0,
      })
    ),
    state(
      '1, *',
      style({
        opacity: 1,
      })
    ),
    transition('1 => 0', animate('500ms ease-out')),
    transition('0 => 1', animate('500ms ease-in')),
    transition('void <=> *', animate('500ms ease-in')),
  ]),
];
