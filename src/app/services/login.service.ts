import {Injectable} from "@angular/core"
import {Http, Headers} from "@angular/http"
import {Observable} from "rxjs"
import "rxjs/add/operator/map"
import "rxjs/add/operator/toPromise"
import 'rxjs/add/operator/catch'

@Injectable()
export class LoginService {
    constructor(private _http: Http) {

    }

    async getUser(user) {
        let headers = new Headers()
        headers.append('Content-type', 'application/json')
        let abc = await this._http.post('routes/users/login', JSON.stringify(user), {headers: headers})
            .toPromise()
            .catch((err:Response) => {
                if(err.status!=200){
                    return null
                }
            })
        if(abc === null ){
            return null
        }
        // console.log(abc.headers.get('x-auth'))
        localStorage.setItem('x-auth', abc.headers.get('x-auth'))
        return abc.json()
    }
}