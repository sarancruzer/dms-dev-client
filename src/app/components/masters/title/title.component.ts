import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  title:string;
  territory:any= [];
  constructor() {
    this.title = "Title";
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
