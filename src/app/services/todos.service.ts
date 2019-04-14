import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoaderService } from "./loader.service";

@Injectable()
export class TodosService {
  constructor(
    private _http: HttpClient,
    private _loaderService: LoaderService
  ) {}

  getTodos(user) {
    const headers = {
      "Content-type": "application/json",
      "x-auth": localStorage.getItem("x-auth")
    };
    this._loaderService.isLoading(true);
    return this._http.post("routes/todos", { ...user }, { headers });
  }

  saveTodo(newTodo, user): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      "x-auth": localStorage.getItem("x-auth")
    };
    return this._http.post("routes/savetodos", { newTodo, user }, { headers });
  }

  updateTodo(newTodo): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      "x-auth": localStorage.getItem("x-auth")
    };
    return this._http.post(
      `routes/updatetodos/${newTodo._id}`,
      { newTodo },
      { headers }
    );
  }

  deleteTodo(todo, user): Observable<any> {
    const headers = {
      "Content-type": "application/json",
      "x-auth": localStorage.getItem("x-auth")
    };
    return this._http.post(
      `routes/deletetodos/${todo._id}`,
      { user, todo },
      { headers }
    );
  }

  logout(user) {
    const headers = {
      "Content-type": "application/json",
      "x-auth": localStorage.getItem("x-auth")
    };
    return this._http
      .post(
        `routes/users/delete/token`,
        { ...user },
        {
          headers
        }
      )
      .pipe(
        tap(() => {
          localStorage.removeItem("x-auth");
          localStorage.removeItem("_id");
          localStorage.removeItem("email");
        })
      );
  }
}
