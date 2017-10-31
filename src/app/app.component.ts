import { GlobalSettings } from './class/global-settings';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers:[GlobalSettings]
})
export class AppComponent {

  constructor(private _router: Router,private _globalSettings:GlobalSettings){
    //  this._router.navigate(['/login']); 
    this._globalSettings.authenticated = JSON.parse(localStorage.getItem("authentication"));
    this._globalSettings.username = localStorage.getItem("first_name");
    }   
  
    ngOnInit() {
      console.log("this._globalSettings.authenticated");
      if(!this._globalSettings.authenticated){
          this._router.navigate(['/login']); 
      }else{
        
      }
  
    }

 }
