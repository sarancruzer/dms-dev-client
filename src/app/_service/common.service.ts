import { Router } from '@angular/router';
import { Http ,Response ,RequestOptions , Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalSettings } from "app/class/global-settings";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";
import { ApiSettings } from "app/class/api-settings";


@Injectable()
export class CommonService {

  headers : any;
  options:any;
  private apiUrl = environment.apiUrl; 
  
  constructor(private _globalSettings : GlobalSettings,private _router : Router,private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json; charset=utf-8');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });
   }

  authRedirect(redirectPath:string){
    this._globalSettings.authenticated = JSON.parse(localStorage.getItem('authentication'));
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

  getContactDetails(params:any) : Observable<any[]> {
    
    return this._http.post(this.apiUrl+'get'+ApiSettings.CONTACTS,params,this.options)
    .map((res:Response) => <any[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  

}
