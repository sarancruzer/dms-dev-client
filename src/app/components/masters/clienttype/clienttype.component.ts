import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-clienttype',
  templateUrl: './clienttype.component.html',
  styleUrls: ['./clienttype.component.css']
})
export class ClienttypeComponent implements OnInit {

  title:string;
  territory:any= [];
  constructor() {
    this.title = "Client Type";
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
