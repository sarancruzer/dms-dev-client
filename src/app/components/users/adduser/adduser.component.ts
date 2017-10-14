import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  user:any = [];

  roles : any = [
    {"id":1,"role_name":"Admin"},
    {"id":2,"role_name":"Manager"},
    {"id":3,"role_name":"Consultant"},
    {"id":4,"role_name":"Clients"},
  ];
  constructor(private router:Router) {
    
   }

  ngOnInit() {
    this.user.state = 1;
  }

  createUser(){
    this.router.navigate(["/manageUsers"]);
  }

}
