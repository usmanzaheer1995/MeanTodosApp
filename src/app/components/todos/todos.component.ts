import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { TodosService } from './../../services/todos.service';

import { Todos } from './todos';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  providers: [TodosService]
})
export class TodosComponent implements OnInit {
  user;
  todos: Todos[];
  isLoading = true;
  create: string;
  creatorId;
  _logoutBtn: boolean;
  constructor(
    private _todosService: TodosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this._logoutBtn = false;
    this.route.paramMap.subscribe((params: Params) => {
      // let userId = params['email'];
      localStorage.setItem('_id', params.get('_id'));
      localStorage.setItem('email', params.get('email'));
      //console.log(params.get('_id'), params.get('email'));
      this.user = { _id: params.get('_id'), email: params.get('email') };
      // console.log(this.user)
    });

    this.todos = [];

    const todo = await this._todosService.getTodos(this.user);
    // console.log(todo)
    if (todo === 401) {
      alert('Unauthorized access');
      this._logoutBtn = true;
      this.router.navigate(['']);
    }
    // console.log(todo)
    this.todos = todo;
    this.isLoading = false;

    // console.log(localStorage.getItem('x-auth'))
  }
  async addTodo($event, form) {
    // console.log(this.user)
    const todoText = form.value.create;
    const newTodo = {
      text: todoText,
      completed: false
    };
    const result = await this._todosService.saveTodo(newTodo, this.user);
    if (result === null) {
      return alert('Something went wrong while save todo!');
    }
    this.todos.push(result);
    form.reset();
  }

  async updateStatus(todo) {
    const _todo = {
      _id: todo._id,
      // text: todo.text,
      // isCompleted: !todo.isCompleted
      _creator: todo._creator,
      text: todo.text,
      completed: !todo.completed,
      completedAt: null
    };
    const result = await this._todosService.updateTodo(_todo);
    if (result === null) {
      return alert('Something went wrong while updating todo!');
    }
    todo.completed = !todo.completed;
    // todo.isEditMode = !todo.isEditMode
  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  async updateTodoText(event, todo) {
    if (event.which === 13) {
      todo.text = event.target.value;
      const _todo = {
        _id: todo._id,
        _creator: todo._creator,
        text: todo.text,
        completed: todo.completed
      };

      const data = await this._todosService.updateTodo(_todo);
      if (data === null) {
        return alert('Something went wrong while updating todo!');
      }
      this.setEditState(todo, false);
    }
  }

  async deleteTodo(todo) {
    const todos = this.todos;
    const result = await this._todosService.deleteTodo(todo, this.user);
    if (result === null) {
      return alert('Something went wrong while deleting todo!');
    }
    // console.log(result)

    for (let i = 0; i < todos.length; ++i) {
      if (todos[i] === todo) {
        todos.splice(i, 1);
      }
    }
  }

  async logout() {
    this._logoutBtn = true;
    const result = await this._todosService.logout(this.user);
    this.router.navigate(['']);
  }

  canDeactivate() {
    if (this._logoutBtn === false) {
      alert('Please logout.');
      return false;
      // return false
    }
    return true;
  }
}
