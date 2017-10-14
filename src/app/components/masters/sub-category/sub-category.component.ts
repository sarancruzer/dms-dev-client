import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  title:string;
  territory:any= [];
  category : number;
  categoryList : any = [
    {"id":1,"cat_name":"Aluminium windows"},
    {"id":2,"cat_name":"Aluminium Doors"},
    {"id":3,"cat_name":"Curtain Wall"},
    {"id":4,"cat_name":"Aluminium Louvres"},
  ];

  constructor() {
    this.title = "Sub Category";
    this.category = 2;
    
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
