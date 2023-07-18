import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {delay, map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class EmailValidatorService implements AsyncValidator {
  // validate(control: AbstractControl):  Observable<ValidationErrors | null> {
  //   const email= control.value;
  //
  //   console.log({email})
  //   return of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(2000)
  //   )
  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({email})

    const httpCallObservable = new Observable<ValidationErrors|null>( (subscriber) => {
      console.log({email})

      if (email === 'oscar@google.com') {
        subscriber.next({ emailTaken: true});
        subscriber.complete();
        // return;
      }

      subscriber.next(null);
      subscriber.complete();
    }).pipe(
      delay(3000)
    );

    return httpCallObservable;


    // LEARNING REFERENCE
    // return this.http.get<string>(`https://myservice.com/user?q=${email}`)
    //   .pipe(
    //     map(response => {
    //       return (response.len === 0) ? null : {emailTaken: true}
    //     })
    //   );
  }


}
