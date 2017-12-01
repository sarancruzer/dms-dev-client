import { License } from 'app/_model/license';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class LicenseService {
  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  model:License[] = [];
  title = "License";
  
  constructor(private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<License[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.LICENSE+'?page='+page,params,this.options)
    .map((res:Response) => <License[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  edit(id:number) : Observable<License[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.LICENSE+"ById/"+id,body,this.options)
    .map((res:Response) => <License[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<License[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.LICENSE,body,this.options)
    .map((res:Response) => <License[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<License[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.LICENSE+'/'+id,body,this.options)
    .map((res:Response) => <License[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<License[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.LICENSE+'/'+id,'',this.options)
    .map((res:Response) => <License[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
