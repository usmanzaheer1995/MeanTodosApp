import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router"

import {IndexComponent} from './components/index/index.component'
import {SignupFormComponent} from './components/signup/signup-form.component'
import {TodosComponent} from './components/todos/todos.component'

import {CanDeactivateGuard} from './guards/can-deactivate-guard.service'

const appRoutes: Routes = [
    {
        path: "",
        component: IndexComponent
    },
    {
        path: "signup",
        component: SignupFormComponent
    },
    {
        path: "todos",
        component: TodosComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    {
        path: "hello",
        component: IndexComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(
    appRoutes,
    {useHash: true}
)