import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { State } from "app/_model/state";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class StateService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  territory:State[] = [];
  title = "State";
  
  constructor(private _http : Http ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<State[]> {
    return this._http.post(this.apiUrl+'get'+this.title+'?page='+page,params,this.options)
    .map((res:Response) => <State[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<State[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+this.title,body,this.options)
    .map((res:Response) => <State[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<State[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+this.title+'/'+id,body,this.options)
    .map((res:Response) => <State[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<State[]> {
    return this._http.post(this.apiUrl+'delete'+this.title+'/'+id,'',this.options)
    .map((res:Response) => <State[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}
