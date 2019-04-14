import { Directive, ElementRef, Renderer, forwardRef } from "@angular/core";
import {
  NG_ASYNC_VALIDATORS,
  Validator,
  AbstractControl
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Directive({
  //[] brackets are used to refer to an attribute
  selector: "[asyncValidator][hello], [asyncValidator][ngModel]",
  //to subscribe to events raised from this element
  host: {
    //key-value pairs; event: method
    "(focus)": "onFocus()",
    "(blur)": "onBlur()"
  },
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AsyncValidator),
      multi: true
    }
  ]
})
export class AsyncValidator implements Validator {
  //private keyword creates an element of type specified in constructor
  constructor(
    private _http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer
  ) {}
  async validateUniqueEmailPromise(email: string) {
    return this._http.get("/users");
  }

  validate(c: AbstractControl) {
    return this.validateUniqueEmailPromise(c.value);
  }
}
