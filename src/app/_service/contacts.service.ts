import { Contacts } from './../_model/contacts';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class ContactsService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  model:Contacts[] = [];
  title = "Users";
  
  constructor(private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<Contacts[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.CONTACTS+'?page='+page,params,this.options)
    .map((res:Response) => <Contacts[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  edit(id:number) : Observable<Contacts[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.CONTACTS+"ById/"+id,body,this.options)
    .map((res:Response) => <Contacts[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<Contacts[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.CONTACTS,body,this.options)
    .map((res:Response) => <Contacts[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<Contacts[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.CONTACTS+'/'+id,body,this.options)
    .map((res:Response) => <Contacts[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<Contacts[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.CONTACTS+'/'+id,'',this.options)
    .map((res:Response) => <Contacts[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}