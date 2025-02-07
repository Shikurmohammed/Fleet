import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors,Validator } from '@angular/forms';
import Validation from '../mechanic/milegeValidator';

@Directive({
  selector: '[compareMilege]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MilegeDirective, multi: true }]
})
export class MilegeDirective implements Validator{

  constructor() { }
    @Input('compareMilege') mileges: number[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.compare(this.mileges[0], this.mileges[1])(formGroup);
  }

}

/*

*/