import { Router } from '@angular/router';
import { Http ,Response ,RequestOptions , Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { GlobalSettings } from "app/class/global-settings";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";
import { ApiSettings } from "app/class/api-settings";

@Injectable()
export class CommonNewService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  constructor(private _globalSettings : GlobalSettings,private _http:Http,private _router:Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });
   }

  getUserRolePermissions(){
      this._globalSettings.role_permissions = localStorage.getItem("role_permissions");
      console.log(JSON.parse(JSON.stringify(this._globalSettings.role_permissions)));
      let role_permissions = JSON.parse(JSON.stringify(this._globalSettings.role_permissions));
      return role_permissions; 
  }

  getUserRoleAccess(){
    this._globalSettings.role_access = localStorage.getItem("role_access");
    console.log(JSON.parse(JSON.stringify(this._globalSettings.role_access)));
    let role_access = JSON.parse(JSON.stringify(this._globalSettings.role_access));
    return role_access; 
}

  authRedirect(redirectPath:string){
    if(!this._globalSettings.authenticated){
      this._router.navigate(['/login']); 
    }else{
      this._router.navigate([redirectPath]); 
    }
    
  }

getMasterDetails(params:any) : Observable<any[]> {
    console.log('this.options');
    console.log(this.options);
    console.log("localStorage.getItem('token')");
    console.log(localStorage.getItem('token'));

    return this._http.post(this.apiUrl+'get'+ApiSettings.MASTERS,params,this.options)
    .map((res:Response) => <any[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
