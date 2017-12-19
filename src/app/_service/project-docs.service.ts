import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ProjectDocs } from '../_model/project-docs';
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class ProjectDocsService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  territory:ProjectDocs[] = [];
  title = "ClientType";
  
  constructor(private _http : Http ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<ProjectDocs[]> {
    
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTDOCS+'?page='+page,params,this.options)
    .map((res:Response) => <ProjectDocs[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<ProjectDocs[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.PROJECTDOCS,this.options)
    .map((res:Response) => <ProjectDocs[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  edit(id:number) : Observable<ProjectDocs[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'edit'+ApiSettings.PROJECTDOCS+"/"+id,body,this.options)
    .map((res:Response) => <ProjectDocs[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<ProjectDocs[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.PROJECTDOCS+'/'+id,body,this.options)
    .map((res:Response) => <ProjectDocs[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<ProjectDocs[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.PROJECTDOCS+'/'+id,'',this.options)
    .map((res:Response) => <ProjectDocs[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}