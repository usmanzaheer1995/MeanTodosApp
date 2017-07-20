import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from "@angular/http"

//import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import {TodosComponent} from './components/todos/todos.component'
import {IndexComponent} from './components/index/index.component'
import {SignupFormComponent} from './components/signup/signup-form.component'

//import {AsyncValidator} from './components/signup/usernameValidator'

import {CanDeactivateGuard} from './guards/can-deactivate-guard.service'

import {routing} from './app.routing'

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    IndexComponent,
    SignupFormComponent,

    //AsyncValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    CanDeactivateGuard,
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
