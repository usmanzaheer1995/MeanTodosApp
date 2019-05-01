import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from "./app.component";
import { TodosComponent } from "./components/todos/todos.component";
import { IndexComponent } from "./components/index/index.component";
import { SignupFormComponent } from "./components/signup/signup-form.component";

// import {AsyncValidator} from './components/signup/usernameValidator'

import { CanDeactivateGuard } from "./guards/can-deactivate-guard.service";
import { AuthGuard } from "./guards/auth.guard";

import { routing } from "./app.routing";
import { TodosGuard } from "./guards/todos.guard";
import { AsyncValidator } from "./components/signup/usernameValidator";

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    IndexComponent,
    SignupFormComponent,

    AsyncValidator
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    CanDeactivateGuard,
    AuthGuard,
    TodosGuard
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
