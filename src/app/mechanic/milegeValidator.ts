//Confrim Password Validation
import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static compare(controlName: any, checkControlName: any): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
     // console.log(control?.value)
      

      if (checkControl?.errors && !checkControl.errors['milege']) {
        return null;
      }

      if (+control?.value > +checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ milege: true });
        return { milege: true };
      } else {
        return null;
      }
    };
  }
}