import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

const RTX5090 = {
  name: 'RTX 5090',
  price: 2500,
  stock: 33
}
@Component({
  templateUrl: './basic-page.component.html',
  styles: []
})
export class BasicPageComponent implements OnInit{

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [],[]),
  //   price: new FormControl(0, [],[]),
  //   stock: new FormControl(0, [],[]),
  // });

  private fb = inject(FormBuilder);

  public myForm = this.fb.group({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3)

    ], []),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ], []),
    stock: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ], []),
  });

  onSave() {
    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset({
      price: 10,
      stock: 0
    });
  }

  ngOnInit(): void {
    // this.myForm.reset(RTX5090)
  }

  // isValidField(field: string): boolean | null {
  //
  //     // @ts-ignore
  //   return ( this.myForm.controls[field].errors && this.myForm.controls[field].touched);
  // }

  isValidField( field: string ): boolean | null {
    // @ts-ignore
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {

    // @ts-ignore
    if ( !this.myForm.controls[field] ) return null;

    // @ts-ignore
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `Min ${ errors['minlength'].requiredLength } characters required.`;
      }
    }

    return null;
  }

}
