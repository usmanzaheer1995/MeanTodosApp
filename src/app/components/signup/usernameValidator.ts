// import { FormControl } from '@angular/forms'
// import { Http } from "@angular/http"
// import {Injectable} from "@angular/core"
// import {Component} from "@angular/core"

// import {UniqueEmailService} from './.././../services/uniqueEmail.service'

// export class UsernameValidator {
//     constructor(private _uniqueEmail: UniqueEmailService) { 

//     }
//     static cannotContainSpaces(control: FormControl) {
//         if (control.value.indexOf(' ') >= 0) {
//             return { cannotContainSpaces: true }
//         }
//         return null
//     }

//     static async shouldBeUnique(control: FormControl) {
//         let email = control.value
//         //let abc = this._http
//         // await Users.findOne({value}).then((user)=>{
//         // })
//         // return new Promise((resolve,reject) => {
//         //     setTimeout(() => {
//         //         if(control.value === 'Usman'){
//         //             resolve({shouldBeUnique:true})
//         //         }
//         //         else{
//         //             resolve(null)
//         //         }
//         //     }, 1000)
//         // })
//         // return new Promise((resolve,reject) => {
//         //     Users.findOne({value}).then((user) => {
//         //         if(user){
//         //             resolve({shouldBeUnique:true})
//         //         }
//         //         else{
//         //             resolve(null)
//         //         }
//         //     })
//         // })
//     }
// }
import { Directive, ElementRef, Renderer, HostListener, forwardRef } from '@angular/core'
import { Observable } from "rxjs";
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from "@angular/forms";
import {Http} from "@angular/http"

@Directive({
    //[] brackets are used to refer to an attribute
    selector: "[asyncValidator][hello], [asyncValidator][ngModel]",
    //to subscribe to events raised from this element
    host: {
        //key-value pairs; event: method
        '(focus)': 'onFocus()',
        '(blur)': 'onBlur()',
    },
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => AsyncValidator), multi: true
        }
    ]
})

export class AsyncValidator implements Validator {

    //private keyword creates an element of type specified in constructor
    constructor(private _http: Http,private el: ElementRef, private renderer: Renderer) {

    }
    async validateUniqueEmailPromise(email: string) {
        console.log('HERE')
        let abc = await this._http.get('/users').toPromise()
        console.log(abc.json())
        
    }

    validate(c: AbstractControl) {
        console.log("HERE")
        return this.validateUniqueEmailPromise(c.value);
    }
}