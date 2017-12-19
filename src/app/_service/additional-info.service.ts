import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';
import { AdditionalInfo } from 'app/_model/additional-info';
import { ProjectNote } from 'app/_model/project-note';

@Injectable()
export class AdditionalInfoService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  territory:AdditionalInfo[] = [];
  
  constructor(private _http : Http ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

  getAdditionalInfoById(id:number) : Observable<AdditionalInfo[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.ADDITIONALINFO+"ById/"+id,body,this.options)
    .map((res:Response) => <AdditionalInfo[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } 

  saveAdditionalInfoById(params:any,id:number) : Observable<AdditionalInfo[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.ADDITIONALINFO+'ById/'+id,body,this.options)
    .map((res:Response) => <AdditionalInfo[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProjectNoteById(id:number) : Observable<ProjectNote[]> {
    console.log(id);
    let body = "";
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTNOTE+"ById/"+id,body,this.options)
    .map((res:Response) => <ProjectNote[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } 

  saveProjectNoteById(params:any,id:number) : Observable<ProjectNote[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.PROJECTNOTE+'ById/'+id,body,this.options)
    .map((res:Response) => <ProjectNote[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  

}