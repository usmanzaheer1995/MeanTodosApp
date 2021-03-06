import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorage.getItem("x-auth")) {
      return true;
    }
    this.router.navigate([
      "/todos",
      localStorage.getItem("_id"),
      localStorage.getItem("email")
    ]);
    //this._locaiton.back();
    return false;
  }
}
