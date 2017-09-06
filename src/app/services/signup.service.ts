import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class SignupService {
  constructor(private _http: Http) {}

  async signupUser(user) {
    let email = user.email;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let abc = await this._http
      .post('routes/findusers', JSON.stringify({ email }), { headers: headers })
      .toPromise()
      .catch((err: Response) => {
        if (err.status != 200) {
          return null;
        }
      });
    if (abc !== null) {
      let signup = await this._http
        .post('routes/users', user)
        .toPromise()
        .catch((err: Response) => {
          if (err.status != 200) {
            return null;
          }
        });
      if (signup !== null) return signup.json();
    }
  }
}
