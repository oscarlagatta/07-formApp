import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: []
})
export class DynamicPageComponent {

  private fb = inject(FormBuilder);

  // public myForm2: FormGroup = new FormGroup({
  //   favouriteGames: new FormArray([])
  // })

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl =
    new FormControl('', [Validators.required]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    // @ts-ignore
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, idx: number) {
    return formArray.controls[idx].errors && formArray.controls[idx].touched;
  }

  getFieldError(field: string): string | null {

    // @ts-ignore
    if (!this.myForm.controls[field]) return null;

    // @ts-ignore
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `Min ${errors['minlength'].requiredLength} characters required.`;
      }
    }

    return null;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newFavorite = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newFavorite, Validators.required)
    );

    this.newFavorite.reset();

  }

  onDeleteFavorite(idx: number): void {
    this.favoriteGames.removeAt(idx);
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
