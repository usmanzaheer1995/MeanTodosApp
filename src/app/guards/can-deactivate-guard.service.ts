import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { TodosComponent } from "./../components/todos/todos.component";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<TodosComponent> {
  constructor(private router: Router) {}

  canDeactivate(
    component: TodosComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return component.canDeactivate();
    // let can = component.canDeactivate();
    // if (!can) {
    //   alert('Deactivation blocked');

    //   this.router.navigate([state.url]);
    //   return false;
    // }

    // return true;
  }
}
