import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { tap, map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable()
export class LoginService {
  constructor(private _http: HttpClient) {}

  getUser(user): Observable<HttpResponse<Object>> {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    return this._http
      .post<HttpResponse<Object>>(
        "routes/users/login",
        { user },
        { headers, observe: "response" }
      )
      .pipe(
        tap(res => {
          localStorage.setItem("x-auth", res.headers.get("x-auth"));
        }),
        map(res => {
          return res.body;
        }),
        catchError(err => {
          return of(err);
        })
      );
  }
}
