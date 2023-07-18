import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmailValidatorService} from "../../../share/services/email-validator.service";
import {ValidatorsService} from "../../../share/services/validators.service";

// import * as customValidators from "../../../share/validators/validators";

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private emailValidatorService = inject(EmailValidatorService);

  private validatorsService = inject(ValidatorsService);

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [ new EmailValidatorService()]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidatorService]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
