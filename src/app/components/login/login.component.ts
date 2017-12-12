import { CommonService } from './../../_service/common.service';
import { GlobalSettings } from './../../class/global-settings';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService  } from '../../_service/login.service';
import { LocalStorage } from "app/_model/local-storage";
import { User } from "app/_model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  lSuccess:any;
  lError:any;
  _local : LocalStorage[] = [];
  
  email:string;
  password:string;

  constructor(private _router : Router,private _loginService : LoginService,private _globalSettings : GlobalSettings,private _commonService:CommonService) {
    this.email = "david@dms.dev";
    this.password = "123456";
   }

  ngOnInit() {
    this._commonService.authRedirect('/dashboard');

  }


  authenticate(){
    this._loginService.getAuthenticate(this.email,this.password).subscribe(response => {
        let res = response.result;
        this.setLocalStorage(res.info,res.token);
        setTimeout(() => {
          this._router.navigate(['/dashboard']); 
        }, 2000);
       
   },
 err =>{
  console.log("error msg");
  let errRes = JSON.parse(err._body);
  this.lError = errRes.error;
  //this.donationlistprovider.showErrorToast(err);
})
}

setLocalStorage(_local,token){
  localStorage.setItem("userId",_local['id']);
  localStorage.setItem("email",_local['email']);
  localStorage.setItem("first_name",_local['first_name']);
  localStorage.setItem("last_name",_local['first_name']);
  localStorage.setItem("mobile",_local['mobile']);
  localStorage.setItem("user_type",_local['user_type']);
  localStorage.setItem("avatar",_local['avatar']);
  localStorage.setItem("token",'Bearer '+token);
  localStorage.setItem("authentication",JSON.stringify(true));
  localStorage.setItem("project_id","1");
 
  let role_permissions = _local['role_permissions'];
  let role_access = [];
   role_permissions.forEach(item => {
         role_access.push(item.module_url);
      });
  localStorage.setItem("role_permissions",JSON.stringify(_local['role_permissions']));
  localStorage.setItem("role_access",JSON.stringify(role_access));
    // this._globalSettings.username = localStorage.getItem("first_name");
  // this._globalSettings.authenticated = JSON.parse(localStorage.getItem("authentication"));

  this._globalSettings.role_permissions = localStorage.getItem("role_permissions");
  this._globalSettings.role_access = localStorage.getItem("role_access");    
}

  signupFunc(){
    console.log("login func");
    this._router.navigate(['/userRegister']);
  }

  forgotPasswordFunc(){
    console.log("login func");
    this._router.navigate(['/forgotPassword']);
  }
  

  

}
