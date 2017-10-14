import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  title:string;
  territory:any= [];
  constructor() {
    this.title = "State";
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
