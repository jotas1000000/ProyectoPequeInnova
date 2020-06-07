import { AbstractControl } from '@angular/forms';

export function patternValidator(regex: RegExp) {
    return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
          // if control is empty return no error
          return null;
        }

        // test the value of the control against the regexp supplied
        if (regex.test(control.value)) {
            if (control.value.includes(' ')) {
                return { patternValidator: true };
            }else {
                return null;
            }
        } else {

            return { patternValidator: true };
        }

        // if true, return no error (no error), else return error passed in the second parameter
      };
  /* if (regex.test(control.value)) {
    return { patternValidator: true };
  }
  return null; */
}