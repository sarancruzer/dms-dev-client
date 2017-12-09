import { ProjectType } from './../_model/project-type';
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class ProjectTypeService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  model:ProjectType[] = [];
  title = "ProjectType";
  
  constructor(private _http : Http ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }
 
  get(page:any,params:any) : Observable<ProjectType[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTTYPE+'?page='+page,params,this.options)
    .map((res:Response) => <ProjectType[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<ProjectType[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.PROJECTTYPE,body,this.options)
    .map((res:Response) => <ProjectType[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<ProjectType[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.PROJECTTYPE+'/'+id,body,this.options)
    .map((res:Response) => <ProjectType[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<ProjectType[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.PROJECTTYPE+'/'+id,'',this.options)
    .map((res:Response) => <ProjectType[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}
