import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodosService {
  constructor(private _http: Http) {}

  async getTodos(user) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('x-auth', localStorage.getItem('x-auth'));
    //console.log(headers)
    try {
      let todo = await this._http
        .post('routes/todos', user, { headers })
        .toPromise();
      return todo.json();
    } catch (error) {
      if (error.status === 401) {
        return error.status;
      }
    }
  }

  async saveTodo(newTodo, user) {
    //console.log(newTodo)
    //console.log(user)
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('x-auth', localStorage.getItem('x-auth'));
    try {
      let todo = await this._http
        .post('routes/savetodos', JSON.stringify({ newTodo, user }), {
          headers: headers
        })
        .toPromise();
      return todo.json();
    } catch (error) {
      return null;
    }
  }

  async updateTodo(newTodo) {
    //console.log('updating')
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('x-auth', localStorage.getItem('x-auth'));
    try {
      let todo = await this._http
        .post(`routes/updatetodos/${newTodo._id}`, JSON.stringify(newTodo), {
          headers: headers
        })
        .toPromise();
      return todo.json();
    } catch (error) {
      return null;
    }
  }

  async deleteTodo(todo, user) {
    //console.log(todo)
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('x-auth', localStorage.getItem('x-auth'));
    try {
      let result = await this._http
        .post(
          `routes/deletetodos/${todo._id}`,
          JSON.stringify({ user, todo }),
          { headers }
        )
        .toPromise();
      return result.json();
    } catch (error) {
      return null;
    }
  }

  async logout(user) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('x-auth', localStorage.getItem('x-auth'));
    await this._http
      .post(`routes/users/delete/token`, JSON.stringify(user), { headers })
      .toPromise();
    localStorage.removeItem('x-auth');
    localStorage.removeItem('_id');
    localStorage.removeItem('email');
    return;
  }
}
