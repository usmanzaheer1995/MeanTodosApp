import { Component, OnDestroy } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";

//import {UsernameValidator} from './usernameValidator'
import { SignupService } from "./../../services/signup.service";
import { Subscription } from "rxjs";

@Component({
  selector: "signup",
  templateUrl: "./signup-form.component.html",
  providers: [SignupService]
})
export class SignupFormComponent implements OnDestroy {
  // myForm = new FormGroup({
  //     username: new FormControl('',Validators.required),
  //     password: new FormControl('',[Validators.required, Validators.min(3)]),
  // })

  myForm: FormGroup;
  private subscription$: Subscription[] = [];

  constructor(
    private _signupService: SignupService,
    fb: FormBuilder,
    private _router: Router
  ) {
    this.myForm = fb.group({
      email: [
        "",
        [
          //synchronous validators
          Validators.required
        ]
        //asynchronous validators
        // [UsernameValidator.shouldBeUnique,]
      ],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async signup() {
    let user = {
      email: this.myForm.value["email"],
      password: this.myForm.value["password"]
    };

    this.subscription$.push(
      this._signupService.signupUser(user).subscribe(
        () => {
          alert("Signup successful!");
          this._router.navigate([""]);
        },
        err => {
          console.log(err);
          return alert("Email already taken.");
        }
      )
    );
  }

  getemail() {
    return this.myForm.get("email");
  }
  getPassword() {
    return this.myForm.get("password");
  }

  ngOnDestroy() {
    this.subscription$.forEach(sub => sub.unsubscribe());
  }
}
