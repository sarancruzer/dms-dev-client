import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  title:string;
  territory:any= [];
  constructor() {
    this.title = "Category";
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
