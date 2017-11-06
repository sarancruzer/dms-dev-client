import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { GlobalSettings } from './../class/global-settings';
import { Injectable } from '@angular/core';
import { ApiSettings } from 'app/class/api-settings';
import { User } from 'app/_model/user';

@Injectable()
export class CommonService {

  model = new User();
  headers : any;
  options:any;
  private apiUrl = environment.apiUrl; 
  
  constructor(private _globalSettings : GlobalSettings,private _router : Router,private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });
   }

  authRedirect(redirectPath:string){
    if(!this._globalSettings.authenticated){
      this._router.navigate(['/login']); 
    }else{
      this._router.navigate([redirectPath]); 
    }
    
  }

  getMasterDetails(params:any) : Observable<any[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.MASTERS,params,this.options)
    .map((res:Response) => <any[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}
