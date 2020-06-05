import { AbstractControl } from '@angular/forms';

export function spaceValidator(control: AbstractControl) {
  if (control.value.startsWith(' ')) {
    return { spaceValid: true };
  }
  return null;
}