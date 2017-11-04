import { Injectable } from '@angular/core';
import { GlobalSettings } from "app/class/global-settings";

@Injectable()
export class CommonNewService {

  constructor(private _globalSettings : GlobalSettings) { }

  getUserRolePermissions(){
      this._globalSettings.role_permissions = localStorage.getItem("role_permissions");
      console.log(JSON.parse(JSON.stringify(this._globalSettings.role_permissions)));
      let role_permissions = JSON.parse(JSON.stringify(this._globalSettings.role_permissions));
      return role_permissions; 
  }

}
