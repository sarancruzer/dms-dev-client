import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

 
  title:string;
  territory:any= [];
  constructor() {
    this.title = "Roles";
   }

  ngOnInit() {
  }

  create(){

  }
  update(){

  }
  delete(){

  }
}
