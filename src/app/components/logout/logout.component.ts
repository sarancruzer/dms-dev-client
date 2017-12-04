import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit() {
    localStorage.removeItem("email");
    localStorage.removeItem("avatar");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("mobile");
    localStorage.removeItem("role_access");
    localStorage.removeItem("authentication");
    localStorage.removeItem("role_permissions");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_type");
    localStorage.removeItem("token");
    this._router.navigate(['/login']); 
  }

}
