import {Component} from "@angular/core"
import {Validators ,FormGroup, FormControl, FormBuilder} from "@angular/forms"
import { Router } from '@angular/router';

//import {UsernameValidator} from './usernameValidator'
import {SignupService} from './../../services/signup.service'

@Component({
    selector:"signup",
    templateUrl:"./signup-form.component.html",
    providers: [SignupService]
})

export class SignupFormComponent{
    // myForm = new FormGroup({
    //     username: new FormControl('',Validators.required),
    //     password: new FormControl('',[Validators.required, Validators.min(3)]),
    // })

    myForm: FormGroup

    constructor(private _signupService: SignupService, fb: FormBuilder, private _router: Router) {
        this.myForm = fb.group({
            email: ['', [    //synchronous validators
                            Validators.required, 
                            ], 
                            //asynchronous validators
                            // [UsernameValidator.shouldBeUnique,]
                        ],
            password: ['', [Validators.required, Validators.minLength(6)]],
        })
    }

    async signup() {
        //console.log(this.myForm)
        let user = {email: this.myForm.value['email'], password: this.myForm.value['password']}
        let result = await this._signupService.signupUser(user)
        console.log(result)
        if(!result){
            alert("Email already taken.")
            return
        }
        alert('Signup successful!')
        this._router.navigate([''])
    }

    getemail() {
        return this.myForm.get('email')
    }
    getPassword() {
        return this.myForm.get('password')
    }
}