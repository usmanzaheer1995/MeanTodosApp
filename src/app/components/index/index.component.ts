import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './../../services/login.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  providers: [LoginService]
})
export class IndexComponent implements OnInit {
  constructor(private _loginService: LoginService, private _router: Router) {}

  ngOnInit() {
    // console.log(localStorage.getItem('x-auth'));
    // if (localStorage.getItem('x-auth')) {
    //   this._router.navigate(['todos']);
    // }
  }

  async onSubmit(form) {
    let result;
    // console.log(form)
    const user = {
      email: form.value['email'],
      password: form.value['password']
    };

    result = await this.loginUser(user);
    if (result === null) {
      alert('Username/Password incorrect');
      return;
    }
    // console.log(result)
    this._router.navigate(['/todos', result._id, result.email]);
    // console.log(result)
  }

  async loginUser(user) {
    let result = await this._loginService.getUser(user);
    //console.log(result)
    return result;
  }
}
