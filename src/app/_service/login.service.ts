import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class LoginService {

  private apiUrl = environment.apiUrl; 
  
  list:any;
  headers : any;
  constructor(private _http: Http){
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
  }


  getAuthenticate(email:string,password:string){
    this.list ={"email":email,"password":password}
    console.log(this.list);
    return this._http.post(this.apiUrl+'authenticate',this.list,this.headers)
    .map(res =>res.json())
    .do(data => console.log(JSON.stringify(data)));
}

}
