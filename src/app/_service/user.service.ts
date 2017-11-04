import { User } from 'app/_model/user';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class UserService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  model:User[] = [];
  title = "Users";
  
  constructor(private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<User[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.USERS+'?page='+page,params,this.options)
    .map((res:Response) => <User[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  edit(id:number) : Observable<User[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.USERS+"ById/"+id,body,this.options)
    .map((res:Response) => <User[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<User[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.USERS,body,this.options)
    .map((res:Response) => <User[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<User[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.USERS+'/'+id,body,this.options)
    .map((res:Response) => <User[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<User[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.USERS+'/'+id,'',this.options)
    .map((res:Response) => <User[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}