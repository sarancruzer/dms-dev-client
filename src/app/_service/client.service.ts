import { Client } from 'app/_model/client';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class ClientService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  model:Client[] = [];
  title = "Client";
  
  constructor(private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<Client[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.USERS+'?page='+page,params,this.options)
    .map((res:Response) => <Client[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  edit(id:number) : Observable<Client[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.USERS+"ById/"+id,body,this.options)
    .map((res:Response) => <Client[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<Client[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.USERS,body,this.options)
    .map((res:Response) => <Client[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<Client[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.USERS+'/'+id,body,this.options)
    .map((res:Response) => <Client[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<Client[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.USERS+'/'+id,'',this.options)
    .map((res:Response) => <Client[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
}
