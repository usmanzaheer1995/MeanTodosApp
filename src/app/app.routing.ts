import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./components/index/index.component";
import { SignupFormComponent } from "./components/signup/signup-form.component";
import { TodosComponent } from "./components/todos/todos.component";

import { CanDeactivateGuard } from "./guards/can-deactivate-guard.service";
import { AuthGuard } from "./guards/auth.guard";
import { TodosGuard } from "./guards/todos.guard";

const appRoutes: Routes = [
  {
    path: "",
    component: IndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "signup",
    component: SignupFormComponent
  },
  {
    path: "todos/:_id/:email",
    component: TodosComponent,
    canActivate: [TodosGuard],
    canDeactivate: [CanDeactivateGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
