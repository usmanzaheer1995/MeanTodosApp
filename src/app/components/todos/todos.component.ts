import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Subscription } from "rxjs";

import { TodosService } from "./../../services/todos.service";

import { Todos } from "./todos";
import { HttpErrorResponse } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "todos",
  templateUrl: "./todos.component.html",
  providers: [TodosService]
})
export class TodosComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription[] = [];

  user;
  public todos: Todos[] = [];
  isLoading = true;
  create: string;
  creatorId;
  _logoutBtn: boolean;
  constructor(
    private _todosService: TodosService,
    private route: ActivatedRoute,
    private router: Router,
    private _loaderService: LoaderService
  ) {}

  ngOnInit() {
    this._logoutBtn = false;
    this.subscriptions$.push(
      this.route.paramMap.subscribe((params: Params) => {
        localStorage.setItem("_id", params.get("_id"));
        localStorage.setItem("email", params.get("email"));
        this.user = { _id: params.get("_id"), email: params.get("email") };
      }),

      this._todosService.getTodos(this.user).subscribe(
        (todos: any) => {
          this._loaderService.isLoading(false);
          this.todos = todos;
          this.isLoading = false;
        },
        (err: HttpErrorResponse) => {
          this._loaderService.isLoading(false);
          if (err.status === 401) {
            alert("Unauthorized access");
            this._logoutBtn = true;
            this.router.navigate([""]);
          } else {
            alert(err.message);
            this._logoutBtn = true;
          }
        }
      )
    );
  }

  addTodo($event, form) {
    // console.log(this.user)
    const todoText = form.value.create;
    const newTodo = {
      text: todoText,
      completed: false
    };

    this.subscriptions$.push(
      this._todosService.saveTodo(newTodo, this.user).subscribe(
        result => {
          this.todos.push(result);
          form.reset();
        },
        err => {
          return alert("Something went wrong while save todo!");
        }
      )
    );
  }

  updateStatus(todo) {
    const _todo = {
      _id: todo._id,
      _creator: todo._creator,
      text: todo.text,
      completed: !todo.completed,
      completedAt: null
    };

    this.subscriptions$.push(
      this._todosService.updateTodo(_todo).subscribe(
        () => {
          todo.completed = !todo.completed;
        },
        err => {
          return alert("Something went wrong while updating todo!");
        }
      )
    );
  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateTodoText(event, todo) {
    if (event.which === 13) {
      todo.text = event.target.value;
      const _todo = {
        _id: todo._id,
        _creator: todo._creator,
        text: todo.text,
        completed: todo.completed
      };

      this.subscriptions$.push(
        this._todosService.updateTodo(_todo).subscribe(
          () => {
            this.setEditState(todo, false);
          },
          err => {
            return alert("Something went wrong while updating todo!");
          }
        )
      );
    }
  }

  deleteTodo(todo) {
    this.subscriptions$.push(
      this._todosService.deleteTodo(todo, this.user).subscribe(
        () => {
          const todos = this.todos;
          for (let i = 0; i < todos.length; ++i) {
            if (todos[i] === todo) {
              todos.splice(i, 1);
            }
          }
        },
        err => {
          return alert("Something went wrong while deleting todo!");
        }
      )
    );
  }

  logout() {
    this._logoutBtn = true;
    this.subscriptions$.push(
      this._todosService
        .logout(this.user)
        .subscribe(() => this.router.navigate([""]), err => console.log(err))
    );
  }

  canDeactivate() {
    if (this._logoutBtn === false) {
      alert("Please logout.");
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
