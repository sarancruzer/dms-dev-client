import { Router } from '@angular/router';
import { GlobalSettings } from './../class/global-settings';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor(private _globalSettings : GlobalSettings,private _router : Router) { }

  authRedirect(redirectPath:string){
    if(!this._globalSettings.authenticated){
      this._router.navigate(['/login']); 
    }else{
      this._router.navigate([redirectPath]); 
    }
    
  }
  

}
