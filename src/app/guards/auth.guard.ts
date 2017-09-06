import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  NavigationEnd,
  NavigationStart,
  Event
} from '@angular/router';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorage.getItem('x-auth')) {
      return true;
    }
    // window.alert("You don't have permission to view this page");
    // const prevUrl = localStorage.getItem('previousUrl');
    this.router.navigate([
      '/todos',
      localStorage.getItem('_id'),
      localStorage.getItem('email')
    ]);
    //this._locaiton.back();
    return false;
  }
}
