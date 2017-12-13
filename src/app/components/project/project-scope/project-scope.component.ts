import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-scope',
  templateUrl: './project-scope.component.html',
  styleUrls: ['./project-scope.component.scss']
})
export class ProjectScopeComponent implements OnInit {

  people:any = [];
  constructor() { }

  ngOnInit() {

    this.loadTable();

  }

  loadTable(){


    this.people = [{
      "_id": "567137b02d704d495ec053c5",
      "age": 24,
      "name": "Schneider Crosby",
      "gender": "male",
      "email": "schneidercrosby@exiand.com",
      "phone": "+1 (814) 416-2089"
    },
    {
      "_id": "567137b09a169eda5257c206",
      "age": 34,
      "name": "Cook Richards",
      "gender": "male",
      "email": "cookrichards@exiand.com",
      "phone": "+1 (904) 515-2147"
    },
    {
      "_id": "567137b083eced915da6b38b",
      "age": 33,
      "name": "Latasha Ware",
      "gender": "female",
      "email": "latashaware@exiand.com",
      "phone": "+1 (865) 413-2197"
    }];

  }

}
