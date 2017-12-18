
import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { Items} from "app/_model/items";
import { Http, RequestOptions, Response ,Headers} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ApiSettings } from 'app/class/api-settings';

@Injectable()
export class ItemsService {

  private apiUrl = environment.apiUrl; 
  
  headers : any;
  options:any;
  territory:Items[] = [];
  title = "Items";
  
  constructor(private _http : Http ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', localStorage.getItem('token'));
    this.options = new RequestOptions({ headers: this.headers });

   }

 
  get(page:any,params:any) : Observable<Items[]> {
    return this._http.post(this.apiUrl+'get'+ApiSettings.ITEMS+'?page='+page,params,this.options)
    .map((res:Response) => <Items[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  add(param:any) : Observable<Items[]> {
    console.log(param);
    let body = JSON.stringify({'info':param});
    return this._http.post(this.apiUrl+'add'+ApiSettings.ITEMS,body,this.options)
    .map((res:Response) => <Items[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  update(params:any,id:number) : Observable<Items[]> {
    let body = JSON.stringify({'info':params});
    return this._http.post(this.apiUrl+'update'+ApiSettings.ITEMS+'/'+id,body,this.options)
    .map((res:Response) => <Items[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  delete(id:number) : Observable<Items[]> {
    return this._http.post(this.apiUrl+'delete'+ApiSettings.ITEMS+'/'+id,'',this.options)
    .map((res:Response) => <Items[]>res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  

}
