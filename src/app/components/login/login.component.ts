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

  constructor(private router : Router,private _loginService : LoginService) {
    this.email = "sarancruzer@dms.dev";
    this.password = "123456";
   }

  ngOnInit() {
  }


  authenticate(){
    this._loginService.getAuthenticate(this.email,this.password).subscribe(response => {
        let res = response.result;
        this._local = res.info
        this.setLocalStorage(this._local,res.token);
        setTimeout(() => {
          this.router.navigate(['/dashboard']); 
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
  

}

  signupFunc(){
    console.log("login func");
    this.router.navigate(['/userRegister']);
  }

  forgotPasswordFunc(){
    console.log("login func");
    this.router.navigate(['/forgotPassword']);
  }
  

  

}
