import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-privilleges',
  templateUrl: './role-privilleges.component.html',
  styleUrls: ['./role-privilleges.component.css']
})
export class RolePrivillegesComponent implements OnInit {

  modules : any = [
    {"id":1,"module_name":"Users","create":true,"read":true,"update":false,"delete":false},
    {"id":2,"module_name":"Clients","create":true,"read":true,"update":false,"delete":false},
    {"id":3,"module_name":"License","create":true,"read":true,"update":false,"delete":false},
    {"id":4,"module_name":"Roles","create":true,"read":true,"update":false,"delete":false},
    {"id":5,"module_name":"Masters","create":true,"read":true,"update":false,"delete":false}
    ];

  roles : any = [
    {"id":1,"role_name":"Admin"},
    {"id":2,"role_name":"Manager"},
    {"id":3,"role_name":"Consultant"},
    {"id":4,"role_name":"Clients"},
  ];

  constructor() {
    
    for (var index = 2; index <= 5; index++) {
     // this.modules.push({"module_name":"module_name "+index,"create":true,"read":true,"update":false,"delete":true});
    }

    for (var index = 1; index <= 5; index++) {
     // this.roles.push({"id":index,"role_name":"role_name "+index});
    }
    
    console.log(this.roles);


   }


  ngOnInit() {
  }

}
