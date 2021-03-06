import { BuildingClass } from './../_model/building-class';

import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class BuildingClassService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  model:BuildingClass[] = [];
  title = "BuildingClass";
  
  constructor(private _http : Http ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }
 
  get(page:any,params:any) : Observable<BuildingClass[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.BUILDINGCLASS+'?page='+page,params,this.options)
    .map((res:Response) => <BuildingClass[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<BuildingClass[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.BUILDINGCLASS,body,this.options)
    .map((res:Response) => <BuildingClass[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<BuildingClass[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.BUILDINGCLASS+'/'+id,body,this.options)
    .map((res:Response) => <BuildingClass[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<BuildingClass[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.BUILDINGCLASS+'/'+id,'',this.options)
    .map((res:Response) => <BuildingClass[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}
