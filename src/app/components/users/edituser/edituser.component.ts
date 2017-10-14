import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  
  user:any = [];

  roles : any = [
    {"id":1,"role_name":"Admin"},
    {"id":2,"role_name":"Manager"},
    {"id":3,"role_name":"Consultant"},
    {"id":4,"role_name":"Clients"},
  ];
  constructor(private router:Router) { }

  ngOnInit() {
    this.user.state = 2;
  }

  updateUser(){
    this.router.navigate(["/manageUsers"]);
  }


}
