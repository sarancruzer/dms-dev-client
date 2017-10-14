
import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  templateUrl: './clientsize.component.html',
})

export class ClientsizeComponent implements OnInit {


  title:string;
  territory:any= [];
  constructor() {
    this.title = "Client Size";
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

