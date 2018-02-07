import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, RequestOptions ,Response,Headers, ResponseContentType } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class ReportService {

  private apiUrl = environment.apiUrl; 
  headers : any;
  options:any;
  
  constructor(private _http : Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers,responseType: ResponseContentType.Blob });

   }

 
  getClientReport() : Observable<Blob> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.CLIENTREPORT,'',this.options)
    .map((res:Response) => <Blob>res.blob())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getProjectReport(id:number) : Observable<Blob> {
    let body = JSON.stringify({"id":id});
    return this._http.post(this.apiUrl+'get'+ApiSettings.PROJECTREPORT,body,this.options)
    .map((res:Response) => <Blob>res.blob())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  


}