import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "./../../services/login.service";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "index",
  templateUrl: "./index.component.html",
  providers: [LoginService]
})
export class IndexComponent implements OnInit, OnDestroy {
  private subscription$: Subscription = null;

  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {}

  onSubmit(form) {
    const user = {
      email: form.value["email"],
      password: form.value["password"]
    };

    this.subscription$ = this._loginService.getUser(user).subscribe(
      (result: any) => {
        this._router.navigate(["/todos", result._id, result.email]);
      },
      err => {
        alert("Username/Password incorrect");
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
