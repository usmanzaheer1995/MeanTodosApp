import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of, Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

@Injectable()
export class SignupService {
  constructor(private _http: HttpClient) {}

  signupUser(user): Observable<any> {
    let email = user.email;
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    return this._http
      .post("routes/findusers", JSON.stringify({ email }), { headers: headers })
      .pipe(
        switchMap(res => {
          if (!res) {
            return this._http.post("routes/users", user);
          } else {
            return throwError("User Already Exists");
          }
        }),
        catchError((err: Response) => {
          if (err.status != 200) {
            return throwError(err);
          }
          return throwError(err);
        })
      );
  }
}
