import { ConfigureProject } from './../_model/configure-project';
import { Observable } from 'rxjs/Observable';
import { ApiSettings } from 'app/class/api-settings';
import { Http, RequestOptions , Response,Headers } from '@angular/http';
import { Project } from './../_model/project';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ProjectTeam } from 'app/_model/project-team';

@Injectable()
export class ProjectService {

 private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  model:Project[] = [];
  teamModel:ProjectTeam[]=[];
  
  

  configureProject:ConfigureProject[] = [];  
  title = "Project";
  
  constructor(private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<Project[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECT+'?page='+page,params,this.options)
    .map((res:Response) => <Project[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  edit(id:number) : Observable<Project[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECT+"ById/"+id,body,this.options)
    .map((res:Response) => <Project[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<Project[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.PROJECT,body,this.options)
    .map((res:Response) => <Project[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<Project[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.PROJECT+'/'+id,body,this.options)
    .map((res:Response) => <Project[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<Project[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.PROJECT+'/'+id,'',this.options)
    .map((res:Response) => <Project[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  
  getConfigureProjectById(id:number) : Observable<ConfigureProject[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.CONFIGUREPROJECT+"ById/"+id,body,this.options)
    .map((res:Response) => <ConfigureProject[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateConfigureProject(params:any,id:number) : Observable<ConfigureProject[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.CONFIGUREPROJECT+'/'+id,body,this.options)
    .map((res:Response) => <ConfigureProject[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProjectTeamById(id:number) : Observable<ProjectTeam[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTTEAM+"ById/"+id,body,this.options)
    .map((res:Response) => <ProjectTeam[]>res.json())
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  updateProjectTeam(params:any,id:number) : Observable<ProjectTeam[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.PROJECTTEAM+'/'+id,body,this.options)
    .map((res:Response) => <ProjectTeam[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProjectScopeMasterDataById(id:number) : Observable<ProjectTeam[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTSCOPEMASTERDATA+"ById/"+id,body,this.options)
    .map((res:Response) => <ProjectTeam[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProjectScopeById(id:number) : Observable<ProjectTeam[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTSCOPEDETAIL+"ById/"+id,body,this.options)
    .map((res:Response) => <ProjectTeam[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


  updateProjectScope(params:any,id:number) : Observable<ProjectTeam[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.PROJECTSCOPEDETAIL+'/'+id,body,this.options)
    .map((res:Response) => <ProjectTeam[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCustomMasterDetails(params:any) : Observable<any[]> {
    
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTSCOPE_M,params,this.options)
    .map((res:Response) => <any[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  isProjectConfigured(id:number) : Observable<any[]> {    
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.ISCONFIGUREPROJECT+"ById/"+id,body,this.options)
    .map((res:Response) => <ConfigureProject[]>res.json())
    .catch((error:any) => Observable.throw(error.json() || 'Server error'));
  }

  
  
  

  



}
